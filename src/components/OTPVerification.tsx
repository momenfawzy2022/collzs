import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function OTPVerification() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ⏱️ Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // 🔁 إعادة إرسال الرمز
  const handleResend = async () => {
    setCanResend(false);
    setTimer(60);
    setMessage('');
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'فشل إعادة الإرسال');
      } else {
        setMessage('تم إعادة إرسال الرمز إلى بريدك الإلكتروني.');
      }
    } catch {
      setError('حدث خطأ أثناء إرسال الطلب');
    }
  };

  // ✅ التحقق من الرمز
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }) // ✅ لاحظ هنا otp مش token
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'رمز غير صحيح');
      } else {
        // ✅ بنروح لصفحة إعادة تعيين كلمة المرور
        navigate(`/reset-password?email=${email}&otp=${otp}`);
      }
    } catch {
      setError('حدث خطأ في التحقق من الرمز');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#101015]">
      <form onSubmit={handleVerify} className="bg-[#18181c] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white-100 mb-6 text-center">التحقق من الرمز</h2>
        <p className="text-white-100 text-center mb-4">تم إرسال رمز مكون من 6 أرقام إلى بريدك: {email}</p>

        <input
          type="text "
          placeholder="أدخل الرمز هنا"
          maxLength={6}
          className="w-full p-3 rounded-lg border border-gray-700 bg-[#2a2929] text-white-100 mb-4 text-center"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-bold text-lg mt-2 transition-all duration-200 bg-blue-300 hover:bg-blue-400 text-white ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'جاري التحقق...' : 'تحقق من الرمز'}
        </button>

        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="w-full mt-4 text-blue-300 underline text-center"
          >
            إعادة إرسال الرمز
          </button>
        ) : (
          <p className="text-center text-white-100 mt-4">
            إعادة الإرسال بعد {timer} ثانية
          </p>
        )}

        {message && <div className="mt-4 text-green-400 text-center animate-pulse">{message}</div>}
        {error && <div className="mt-4 text-red-400 text-center animate-pulse">{error}</div>}
      </form>
    </div>
  );
}

export default OTPVerification;
