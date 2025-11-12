// Kunci untuk menyimpan data user yang sedang login
const SESSION_KEY = 'loggedInUser';

/**
 * Menyimpan data user ke sessionStorage (session-only).
 * @param {object} userData - Objek user yang login.
 */
function createSession(userData) {
  // Hanya simpan data yang tidak sensitif (JANGAN SIMPAN PASSWORD)
  const sessionData = {
    nis: userData.nis,
    nama: userData.nama,
    role: userData.role,
    tingkatan: userData.tingkatan,
    kelas: userData.kelas
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
}

/**
 * Mengambil data user yang sedang login dari sessionStorage.
 */
function getSession() {
  const sessionData = sessionStorage.getItem(SESSION_KEY);
  return sessionData ? JSON.parse(sessionData) : null;
}

/**
 * Menghapus sesi login (logout).
 */
function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

/**
 * Fungsi Logout lengkap.
 */
function handleLogout() {
  clearSession();
  alert('Anda telah logout.');
  window.location.href = 'index.html';
}

/**
 * Pelindung Halaman (Auth Guard).
 * Memeriksa apakah user boleh mengakses halaman.
 * @param {string} requiredRole - Role yang diizinkan ('admin' atau 'siswa').
 */
function protectPage(requiredRole = null) {
  const user = getSession();

  if (!user) {
    // Jika tidak ada sesi, tendang ke login
    alert('Anda harus login untuk mengakses halaman ini.');
    window.location.href = 'index.html';
    return null; // Tambahkan return null untuk menghentikan eksekusi
  }

  if (requiredRole && user.role !== requiredRole) {
    // Jika ada sesi, tapi role tidak cocok
    alert('Anda tidak memiliki izin untuk mengakses halaman ini.');
    // Tendang ke halaman yang sesuai rolenya
    const destination = user.role === 'admin' ? 'admin.html' : 'dashboard.html';
    window.location.href = destination;
    return null; // Tambahkan return null
  }

  // Jika lolos, kembalikan data user
  return user;
}