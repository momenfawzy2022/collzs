require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456789',
  database: process.env.DB_NAME || 'test'
}).promise();

// 🧠 Create User
app.post('/api/test/users', async (req, res) => {
  const { username, email, password, country } = req.body;

  if (!username || !email || !password || !country) {
    return res.status(400).json({ message: "يرجى إدخال جميع البيانات" });
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (rows.length > 0) {
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

// 🔁 Forgot Password (Send OTP)
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'البريد الإلكتروني مطلوب' });

  try {
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (!users.length) return res.status(404).json({ message: 'لا يوجد مستخدم بهذا البريد' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await db.execute(`CREATE TABLE IF NOT EXISTS password_resets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      otp VARCHAR(10) NOT NULL,
      expires DATETIME NOT NULL
    )`);

    await db.execute('DELETE FROM password_resets WHERE email = ?', [email]);
    await db.execute('INSERT INTO password_resets (email, otp, expires) VALUES (?, ?, ?)', [email, otp, expires]);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'رمز التحقق (OTP) لاستعادة كلمة المرور',
      html: `
        <p>رمز التحقق الخاص بك هو:</p>
        <h2>${otp}</h2>
        <p>الرمز صالح لمدة 10 دقائق فقط.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني' });

  } catch (err) {
    console.error('OTP Send Error:', err);
    res.status(500).json({ message: 'حدث خطأ أثناء إرسال رمز التحقق' });
  }
});

// ✅ Verify OTP
// ✅ تعديل راوت التحقق من OTP
app.post('/api/verify-otp', async (req, res) => {
  const { email, otp } = req.body; // ✅ بدل token إلى otp

  if (!email || !otp) {
    return res.status(400).json({ message: 'البريد والرمز مطلوبان' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT * FROM password_resets WHERE email = ? AND otp = ? AND expires > NOW()',
      [email, otp]
    );

    if (!rows.length) {
      return res.status(400).json({ message: 'رمز غير صحيح أو منتهي الصلاحية' });
    }

    res.json({ message: 'رمز صحيح' });
  } catch (err) {
    console.error('OTP Verify Error:', err);
    res.status(500).json({ message: 'حدث خطأ في السيرفر' });
  }
});


// 🔒 Reset Password
app.post('/api/test/password_resets', async (req, res) => {
  const { otp, email, password } = req.body;

  if (!otp || !email || !password) {
    return res.status(400).json({ message: 'جميع الحقول مطلوبة' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT * FROM password_resets WHERE email = ? AND otp = ? AND expires > NOW()',
      [email, otp]
    );

    if (!rows.length) {
      return res.status(400).json({ message: 'رمز التحقق غير صحيح أو منتهي الصلاحية' });
    }

    await db.execute('UPDATE users SET password = ? WHERE email = ?', [password, email]);
    await db.execute('DELETE FROM password_resets WHERE email = ?', [email]);

    res.json({ message: 'تم تغيير كلمة المرور بنجاح' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ message: 'حدث خطأ في السيرفر' });
  }
});

// 🔑 Login API
app.post('/api/login', async (req, res) => {
  console.log('LOGIN BODY:', req.body); // تتبع بيانات الطلب
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'اسم المستخدم وكلمة المرور مطلوبة' });
  }
  try {
    const [users] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (!users.length) {
      return res.status(401).json({ message: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
    }
    const user = users[0];
    if (user.password !== password) {
      return res.status(401).json({ message: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
    }
    res.json({ message: 'تم تسجيل الدخول بنجاح', username: user.username });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'حدث خطأ في السيرفر' });
  }
});

// ✅ Reservation Count API (GET, POST)
// جدول reservations يجب أن يحتوي على عمود count INT

// جلب عدد الحجوزات
app.get('/api/test/reservations', async (req, res) => {
  try {
    // إذا لم يوجد جدول reservations أنشئه أول مرة
    await db.query(`CREATE TABLE IF NOT EXISTS reservations (id INT PRIMARY KEY, count INT)`);
    // جلب العدد الحالي
    const [rows] = await db.query('SELECT count FROM reservations WHERE id = 1');
    let count = 0;
    if (rows.length) count = rows[0].count;
    else {
      // إذا لم يوجد صف، أنشئه
      await db.query('INSERT INTO reservations (id, count) VALUES (1, 0)');
    }
    res.json({ count });
  } catch (err) {
    console.error('Get reservations error:', err);
    res.status(500).json({ message: 'Database error' });
  }
});

// زيادة عدد الحجوزات
app.post('/api/test/reservations', async (req, res) => {
  try {
    await db.query(`CREATE TABLE IF NOT EXISTS reservations (id INT PRIMARY KEY, count INT)`);
    // تحقق من وجود الصف
    const [rows] = await db.query('SELECT count FROM reservations WHERE id = 1');
    if (!rows.length) {
      await db.query('INSERT INTO reservations (id, count) VALUES (1, 0)');
    }
    await db.query('UPDATE reservations SET count = count + 1 WHERE id = 1');
    const [newRows] = await db.query('SELECT count FROM reservations WHERE id = 1');
    res.json({ count: newRows[0].count });
  } catch (err) {
    console.error('Increment reservations error:', err);
    res.status(500).json({ message: 'Database error' });
  }
});

// ✅ Start Server
app.listen(5000, () => {
  console.log('Server running on port 5000');

  // Optional test
  async function sendTestEmail() {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER,
        subject: 'Test Email',
        text: 'This is a test email from Node.js'
      });

      console.log('SMTP TEST SUCCESS:', info.response);
    } catch (err) {
      console.error('SMTP TEST FAILED:', err);
    }
  }

  sendTestEmail();
});
