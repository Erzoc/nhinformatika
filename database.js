// Nama-nama kunci untuk database di localStorage
const DB_USERS = 'portal_users';
const DB_MATERIALS = 'portal_materials';
const DB_EXAMS = 'portal_exams';

// --- FUNGSI DATABASE PENGGUNA (USERS) ---

/**
 * Mendapatkan semua data pengguna dari localStorage.
 * Jika kosong, buat akun admin default.
 */
function getUsers() {
  let users = JSON.parse(localStorage.getItem(DB_USERS));
  if (!users || users.length === 0) {
    // Buat akun admin default jika database kosong
    users = [
      {
        nis: '1001',
        nama: 'Administrator',
        password: 'admin',
        role: 'admin',
        tingkatan: 'SMA', // Data baru
        kelas: '3'         // Data baru
      },
      {
        nis: '2001',
        nama: 'Siswa Contoh',
        password: 'siswa',
        role: 'siswa',
        tingkatan: 'SMP', // Data baru
        kelas: '1'        // Data baru
      }
    ];
    saveUsers(users);
  }
  return users;
}

/**
 * Menyimpan array pengguna ke localStorage.
 * @param {Array} users - Array objek pengguna.
 */
function saveUsers(users) {
  localStorage.setItem(DB_USERS, JSON.stringify(users));
}

/**
 * Mencari pengguna berdasarkan NIS.
 * @param {string} nis - Nomor Induk Siswa.
 */
function findUserByNIS(nis) {
  const users = getUsers();
  return users.find(user => user.nis === nis);
}

/**
 * Menambahkan pengguna baru.
 * @param {object} userData - Objek pengguna baru (nis, nama, password, role, tingkatan, kelas).
 * @returns {boolean} - True jika berhasil, false jika NIS sudah ada.
 */
function addUser(userData) {
  const users = getUsers();
  if (findUserByNIS(userData.nis)) {
    return false; // Gagal, NIS sudah ada
  }
  users.push(userData);
  saveUsers(users);
  return true; // Berhasil
}

/**
 * Menghapus pengguna berdasarkan NIS.
 * @param {string} nis - Nomor Induk Siswa.
 */
function deleteUser(nis) {
  let users = getUsers();
  users = users.filter(user => user.nis !== nis);
  saveUsers(users);
}

// --- FUNGSI DATABASE MATERI (MATERIALS) ---

/**
 * Mendapatkan semua data materi.
 */
function getMaterials() {
  const materials = JSON.parse(localStorage.getItem(DB_MATERIALS)) || [];
  return materials;
}

/**
 * Menyimpan array materi ke localStorage.
 * @param {Array} materials - Array objek materi.
 */
function saveMaterials(materials) {
  localStorage.setItem(DB_MATERIALS, JSON.stringify(materials));
}

/**
 * Menambahkan materi baru.
 * @param {object} materialData - Objek materi (id, title, ..., tingkatan, kelas).
 */
function addMaterial(materialData) {
  const materials = getMaterials();
  materials.push(materialData);
  saveMaterials(materials);
}

/**
 * Menghapus materi berdasarkan ID.
 * @param {string|number} id - ID unik materi.
 */
function deleteMaterial(id) {
  let materials = getMaterials();
  materials = materials.filter(m => m.id != id);
  saveMaterials(materials);
}

// --- FUNGSI DATABASE SOAL (EXAMS) ---

/**
 * Mendapatkan semua data soal.
 */
function getExams() {
  const exams = JSON.parse(localStorage.getItem(DB_EXAMS)) || [];
  return exams;
}

/**
 * Menyimpan array soal ke localStorage.
 * @param {Array} exams - Array objek soal.
 */
function saveExams(exams) {
  localStorage.setItem(DB_EXAMS, JSON.stringify(exams));
}

/**
 * Menambahkan soal baru.
 * @param {object} examData - Objek soal (id, title, ..., tingkatan, kelas).
 */
function addExam(examData) {
  const exams = getExams();
  exams.push(examData);
  saveExams(exams);
}

/**
 * Menghapus soal berdasarkan ID.
 * @param {string|number} id - ID unik soal.
 */
function deleteExam(id) {
  let exams = getExams();
  exams = exams.filter(e => e.id != id);
  saveExams(exams);
}