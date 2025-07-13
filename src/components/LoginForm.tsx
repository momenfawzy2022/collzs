import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // استخراج باراميتر redirect من رابط تسجيل الدخول
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Replace with your actual login API endpoint
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'خطأ في تسجيل الدخول');
      } else {
        // حفظ اسم المستخدم في localStorage
        if (data.username) {
          localStorage.setItem('username', data.username);
        } else {
          // fallback: استخدم username المدخل
          localStorage.setItem('username', username);
        }
        // إعادة التوجيه للصفحة المطلوبة إذا وجد باراميتر redirect
        if (redirect) {
          navigate(redirect);
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#101015]">
      <form onSubmit={handleSubmit} className="bg-[#18181c] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white-100 mb-6 text-center">تسجيل الدخول</h2>
        <label className="block mb-2 text-white-100">اسم المستخدم</label>
        <input
          type="text"
          className="w-full p-3 rounded-lg border border-gray-700 bg-[#101015] text-white-100 mb-4"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <label className="block mb-2 text-white-100">كلمة المرور</label>
        <input
          type="password"
          className="w-full p-3 rounded-lg border border-gray-700 bg-[#101015] text-white-100 mb-4"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <div className="flex justify-end mb-4">
          <a href="/forgot-password" className="text-sm text-blue-300 hover:underline">نسيت كلمة المرور؟</a>
        </div>
        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-bold text-lg mt-2 transition-all duration-200 bg-blue-300 hover:bg-blue-400 text-white ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'جاري الدخول...' : 'دخول'}
        </button>
        {error && <div className="mt-4 text-red-400 text-center animate-pulse">{error}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
