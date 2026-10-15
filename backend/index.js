const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 4000;

// Create connection to MySQL (use service name as host)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MyNewPass123!',
  database: 'app_db'
});

app.use(cors());

app.get('/api/db-check', (req, res) => {
  connection.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) {
      return res.status(500).json({ status: 'error', error: err.message });
    }
    res.json({ status: 'ok', result: results[0].result });
  });
});


app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`);
});
