// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'myapp'
}).promise();

app.post('/api/test/users', async (req, res) => {
  console.log('BODY:', req.body); // فحص البيانات القادمة من الواجهة الأمامية
  const { username, email, password, country } = req.body;

  // تحقق من أن جميع الحقول موجودة
  if (!username || !email || !password || !country) {
    return res.status(400).json({ message: "يرجى إدخال جميع البيانات" });
  }

  try {
    // تحقق إذا كان اليوزرنيم أو الإيميل موجودين بالفعل
    const [rows] = await db.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );
    if (rows.length > 0) {
      // تحقق أيهما موجود
      const usernameExists = rows.some(row => row.username === username);
      const emailExists = rows.some(row => row.email === email);
      let message = '';
      if (usernameExists && emailExists) {
        message = 'اسم المستخدم والبريد الإلكتروني مستخدمان بالفعل';
      } else if (usernameExists) {
        message = 'اسم المستخدم مستخدم بالفعل';
      } else {
        message = 'البريد الإلكتروني مستخدم بالفعل';
      }
      return res.status(409).json({ message });
    }

    await db.query(
      'INSERT INTO users (username, email, password, country) VALUES (?, ?, ?, ?)',
      [username, email, password, country]
    );
    res.json({ message: "تم التسجيل بنجاح!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Database error" });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));