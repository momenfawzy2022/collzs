import React, { useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import "locomotive-scroll/dist/locomotive-scroll.css";


gsap.registerPlugin(ScrollTrigger);

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/myapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setMessage(data.message || 'تم التسجيل بنجاح!');
    } catch (err) {
      setMessage('حدث خطأ أثناء التسجيل');
    }
  };

  return (
    <>
    
    <div
      className='z-20'
      style={{
        minHeight: '150vh',
        background: `url('/img/zor.jpg') center/cover no-repeat`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // الفورم قريب من الأعلى
        paddingTop: 50,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url('/img/conqueronline.jpg') center/cover no-repeat`,
          borderRadius: 16,
          boxShadow: '0 4px 24px #0001',
          padding: 80,
          minWidth: 500,
          position: 'relative',
          zIndex: 2,
          marginBottom: 50, // مسافة من الأسفل
          marginTop: 150    // مسافة من الأعلى
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Register</h2>
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 8, background: '#6366f1', color: '#fff', border: 'none', fontWeight: 600 }}>
          Sign Up
        </button>
        {message && <div style={{ marginTop: 16, color: '#16a34a', textAlign: 'center' }}>{message}</div>}
      </form>
    </div>
    </>
  )
}

export default Register