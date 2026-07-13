const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Konfigurasi koneksi ke PostgreSQL
const pool = new Pool({
  user: 'postgres',          // Sesuaikan dengan username postgres kamu
  host: 'localhost',
  database: 'mahasiswa',     // Nama database sesuai tugas
  password: 'faiz18', // Ubah dengan password postgres kamu
  port: 5432,
});

// Middleware agar Express bisa membaca JSON (opsional untuk GET, tapi baik untuk kebiasaan)
app.use(express.json());

// Rute untuk halaman utama (/)
app.get('/', (req, res) => {
  res.send('Selamat datang di API Mahasiswa! Silakan akses /api/biodata untuk melihat data.');
});
// METHOD GET: Mengambil semua data dari tabel biodata
app.get('/api/biodata', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM biodata');
    
    // Kembalikan data dalam bentuk JSON
    res.status(200).json({
      status: 'success',
      message: 'Data biodata berhasil diambil',
      data: result.rows
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 'error',
      message: 'Terjadi kesalahan pada server'
    });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});