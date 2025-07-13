import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'حدث خطأ');
      } else {
        // ✅ ننتقل لصفحة إدخال الرمز OTP
        navigate(`/otp?email=${encodeURIComponent(email)}`);
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
        <h2 className="text-2xl font-bold text-white-100 mb-6 text-center">استرجاع كلمة المرور</h2>

        <label className="block mb-2 text-white-100">البريد الإلكتروني</label>
        <input
          type="email"
          className="w-full p-3 rounded-lg border border-gray-700 bg-[#ffffff] text-black mb-4"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-bold text-lg mt-2 transition-all duration-200 bg-blue-300 hover:bg-blue-400 text-white ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'جاري الإرسال...' : 'إرسال الرمز'}
        </button>

        {error && <div className="mt-4 text-red-400 text-center animate-pulse">{error}</div>}
      </form>
    </div>
  );
}

export default ForgotPassword;
