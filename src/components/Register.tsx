import React from 'react'
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import "locomotive-scroll/dist/locomotive-scroll.css";

gsap.registerPlugin(ScrollTrigger);

function Register() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #0001', padding: 32, minWidth: 320 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Register</h2>
        <div style={{ marginBottom: 16 }}>
          <input type="text" placeholder="Username" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input type="email" placeholder="Email" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input type="password" placeholder="Password" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 8, background: '#6366f1', color: '#fff', border: 'none', fontWeight: 600 }}>Sign Up</button>
      </form>
    </div>
  )
}

export default Register