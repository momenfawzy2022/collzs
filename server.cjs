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
}).promise();

app.post('/api/myapp', async (req, res) => {
  const { username, email, password } = req.body;

  // تحقق من أن جميع الحقول موجودة
  if (!username || !email || !password) {
    return res.status(400).json({ message: "يرجى إدخال جميع البيانات" });
  }

  try {
    await db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    res.json({ message: "تم التسجيل بنجاح!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Database error" });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));