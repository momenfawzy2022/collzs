import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const otp = searchParams.get('otp') || ''; // ✅ بدل token
  const email = searchParams.get('email') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePassword = (password: string) => password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!validatePassword(password)) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    if (!password || !confirmPassword) {
      setError('يرجى إدخال كلمة المرور وتأكيدها');
      return;
    }

    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/test/password_resets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, email, password }) // ✅ استخدم otp
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'حدث خطأ');
      } else {
        setMessage('تم تغيير كلمة المرور بنجاح!');
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
        <h2 className="text-2xl font-bold text-white-100 mb-6 text-center">إعادة تعيين كلمة المرور</h2>

        <input type="hidden" value={otp} />
        <input type="hidden" value={email} />

        <label className="block mb-2 text-white-100">كلمة المرور الجديدة</label>
        <input
          type="password"
          className="w-full p-3 rounded-lg border border-gray-700 bg-[#1c1c1c] text-white-100 mb-4"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <label className="block mb-2 text-white-100">تأكيد كلمة المرور</label>
        <input
          type="password"
          className="w-full p-3 rounded-lg border border-gray-700 bg-[#1c1c1c] text-white-100 mb-4"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-bold text-lg mt-2 transition-all duration-200 bg-blue-300 hover:bg-blue-400 text-white-100 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'جاري التغيير...' : 'تغيير كلمة المرور'}
        </button>

        {message && (
          <div className="mt-4 text-green-400 text-center animate-pulse">
            {message}
            <div className="mt-2">
              <a href="/register" className="text-blue-300 underline">العودة لتسجيل الدخول</a>
            </div>
          </div>
        )}

        {error && <div className="mt-4 text-red-400 text-center animate-pulse">{error}</div>}
      </form>
    </div>
  );
}

export default ResetPassword;
