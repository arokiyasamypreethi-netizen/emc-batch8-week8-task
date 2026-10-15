const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 4000;

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

app.use(cors());

app.get('/api/db-check', (req, res) => {
  pool.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) {
      return res.status(500).json({ status: 'error', error: err.message });
    }
    res.json({ status: 'ok', result: results[0].result });
  });
});

app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`);
});