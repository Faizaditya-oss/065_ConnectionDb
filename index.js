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


// METHOD GET: Mengambil semua data dari tabel biodata
app.get('/', (req, res) => {
    console.log("TEST DATA: ");
    pool.query('SELECT * FROM biodata')
        .then(testData => {
            console.log(testData.rows);
            res.json(testData.rows);
})
  .catch (err => {
    console.error("Error executing query", err.stack);
    res.status(500).send("Database error");
    });
  
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
