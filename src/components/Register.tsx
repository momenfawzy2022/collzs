import React, { useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';



gsap.registerPlugin(ScrollTrigger);

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '', country: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  if (form.password !== form.confirmPassword) {
    setError('Passwords do not match');
    return;
  }
  try {
    console.log("Sending form data:", {
      username: form.username,
      email: form.email,
      password: form.password,
      country: form.country
    });

  const res = await fetch('http://localhost:5000/api/test/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: form.username || "test",
    email: form.email || "test@test.com",
    password: form.password || "123456",
    country: form.country || "Egypt"
  })
});


    const text = await res.text();
    console.log('Status:', res.status, 'Response:', text);

    if (!res.ok) {
      console.warn('خطأ في الاستجابة:', text);
      setMessage(text || 'حدث خطأ');
      return;
    }

    const data = JSON.parse(text);
    setMessage(data.message || 'تم التسجيل بنجاح!');
    setTimeout(() => {
      window.scrollTo(0, 0);
      window.location = undefined;
    }, 1000);
    // إعادة التوجيه إلى صفحة preregister مع تمرير justRegistered
    window.location.href = '/preregister?justRegistered=1';
    // إذا كنت تستخدم useNavigate:
    // navigate('/preregister', { state: { justRegistered: true } });
  } catch (error) {
    console.error('خطأ في الاتصال بالسيرفر:', error);
    setMessage('حدث خطأ أثناء التسجيل');
  }
};


  const isFormFilled = form.username && form.email && form.password && form.confirmPassword && form.country;

  return (
    <>
    <div
      className='z-20 relative min-h-screen flex justify-center items-start pt-16 overflow-hidden'
      style={{
        background: '#101015',
      }}
    >
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
      <div 
				className="absolute -left-20 top-0 w-1/2 h-full bg-cover bg-center transform-gpu transition-transform duration-1000 hover:scale-110 z-10"
				style={{
					backgroundImage: "url('/public/img/classe/zy-ys2.webp')",
					clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)"
				}}
			/>
        <source src="/img/heaسder_vid.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative border border-[#23233a] bg-[#18181c] rounded-2xl shadow-2xl px-8 py-10 w-full max-w-md mx-auto mt-12 animate-fade-in-up"
        style={{ boxShadow: '0 8px 32px #0004' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button type="button" className="text-white-100 hover:text-blue-400 flex items-center gap-1 text-base font-medium">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="rtl:rotate-180"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
        </div>
        <h2 className="text-2xl font-bold text-right text-white-100 mb-2">Create your account</h2>
        
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 text-sm text-white-100 font-medium">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder=""
            value={form.username}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border border-gray-700 bg-[#1c1c1c] focus:outline-none focus:ring-2 focus:ring-blue-700 transition
              ${form.username ? 'text-white-100' : 'text-white-200'}
              hover:text-gray-400`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm text-white-100 font-medium">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder=""
            value={form.email}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border border-gray-700 bg-[#1c1c1c] focus:outline-none focus:ring-2 focus:ring-blue-700 transition
              ${form.email ? 'text-white-100' : 'text-white-200'}
              hover:text-gray-400`}
          />
        </div>
        <div className="mb-6 relative">
          <label htmlFor="password" className="block mb-1 text-sm text-white-100 font-medium">Password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder=""
            value={form.password}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border border-gray-700 bg-[#1c1c1c] focus:outline-none focus:ring-2 focus:ring-blue-700 transition pr-12
              ${form.password ? 'text-white-100' : 'text-white-200'}
              hover:text-gray-400`}
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-white-200 hover:text-blue-400 text-xl focus:outline-none"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="mb-6 relative">
          <label htmlFor="confirmPassword" className="block mb-1 text-sm text-white-100 font-medium">Confirm Password</label>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder=""
            value={form.confirmPassword}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border border-gray-700 bg-[#1c1c1c] focus:outline-none focus:ring-2 focus:ring-blue-700 transition pr-12
              ${form.confirmPassword ? 'text-white-100' : 'text-white-200'}
              hover:text-gray-400`}
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 -translate-y-1/2 text-white-200 hover:text-blue-400 text-xl focus:outline-none"
            tabIndex={-1}
            onClick={() => setShowConfirmPassword((v) => !v)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          
        </div>
        <div className="mb-6">
          <label htmlFor="country" className="block mb-1 text-sm text-white-100 font-medium">Country</label>
          <select
            id="country"
            name="country"
            value={form.country}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg border border-gray-700 bg-[#1c1c1c] focus:outline-none focus:ring-2 focus:ring-blue-700 transition
              ${form.country ? 'text-white-100' : 'text-white-100'}
              hover:text-gray-400`}
            required
          >
            <option value="" disabled>Select your country</option>
            <option value="Egypt">Egypt</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="UAE">UAE</option>
            <option value="Morocco">Morocco</option>
            <option value="Algeria">Algeria</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Jordan">Jordan</option>
            <option value="Iraq">Iraq</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Qatar">Qatar</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Oman">Oman</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Palestine">Palestine</option>
            <option value="Sudan">Sudan</option>
            <option value="Libya">Libya</option>
            <option value="Yemen">Yemen</option>
            <option value="Syria">Syria</option>
            <option value="Comoros">Comoros</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Somalia">Somalia</option>
            {/* European countries */}
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="Italy">Italy</option>
            <option value="Spain">Spain</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Sweden">Sweden</option>
            <option value="Norway">Norway</option>
            <option value="Denmark">Denmark</option>
            <option value="Finland">Finland</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Austria">Austria</option>
            <option value="Belgium">Belgium</option>
            <option value="Greece">Greece</option>
            <option value="Portugal">Portugal</option>
            <option value="Ireland">Ireland</option>
            <option value="Poland">Poland</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Hungary">Hungary</option>
            <option value="Romania">Romania</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Croatia">Croatia</option>
            <option value="Estonia">Estonia</option>
            <option value="Latvia">Latvia</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Malta">Malta</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-bold text-lg mt-6 transition-all duration-200
            ${isFormFilled ? 'bg-blue-300 hover:bg-blue-300 text-white-100 cursor-pointer shadow-md' : 'bg-[#393939] text-gray-400 cursor-not-allowed'}`}
          disabled={!isFormFilled}
        >
          Continue
        </button>
        <div className="text-right mt-2">
  <div className="text-right mt-2">
  <Link
    to="/forgot-password"
    className="text-sm text-white-100 hover:underline transition duration-200"
  >
    هل نسيت كلمة المرور؟
  </Link>
</div>
</div>
        {message && <div className="mt-4 text-white-100 text-center animate-pulse">{message}</div>}
        {error && <div className="mt-2 mb-2 text-white-100 text-center font-bold animate-pulse">{error}</div>}
      </form>
    </div>
    </>
  )
}

export default Register