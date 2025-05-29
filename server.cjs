// server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myapp'
});

app.post('/api/myapp', (req, res) => {
  const { username, email, password } = req.body;
  db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password],
    (err, result) => {
      if (err) {
        console.error('DB Error:', err); // طباعة الخطأ في الكونسول
        return res.status(500).json({ message: 'Database error', error: err.sqlMessage });
      }
      res.json({ message: 'تم التسجيل بنجاح!' });
    }
  );
});

app.listen(5000, () => console.log('Server running on port 5000'));