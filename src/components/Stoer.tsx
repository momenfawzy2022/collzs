import React, { useState } from 'react'
import "locomotive-scroll/dist/locomotive-scroll.css";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);



const products = [
  {
    title: 'VIP 4 Token (7 DAY)',
    desc: 'Drop Cps 1-3',
    price: 7,
    img: '/img/imgItmes/vip png.png',
    bg: 'bg-[#0a0a1a]'
  },
  {
    title: 'VIP 4 Token (30 DAY)',
    desc: 'Drop Cps 1-3',
    price: 20,
    img: '/img/imgItmes/vip png.png',
    bg: 'bg-[#0a0a1a]'
  },
  {
    title: 'VIP 6 Token (7 DAY)',
    desc: 'Drop Cps 2-4',
    price: 10,
    img: '/img/imgItmes/vip png.png',
    bg: 'bg-[#0a0a1a]'
  },
    {
    title: 'VIP 6 Token (30 DAY)',
    desc: 'Drop Cps 2-4',
    price: 30,
    img: '/img/imgItmes/vip png.png',
    bg: 'bg-[#0a0a1a]'
  },
    {
    title: 'VIP 4 Full (Permanently)',
    desc: 'Drop Cps 1-3\nSharing player 1',
    price: 50,
    img: '/img/imgItmes/vip png.png',
    bg: 'bg-[#0a0a1a]'
  },
  {
    title: 'VIP 6 Full (Permanently)',
    desc: 'Drop Cps 2-4\nSharing player 2 \n Token OutoHunt ',
    price: 80,
    img: '/img/imgItmes/vip png.png',
    bg: 'bg-[#0a0a1a]'
  },
    {
    title: ' Full (Chi)',
    desc: 'You can use it to unlock Chi levels at 400.',
    price: 50,
    img: '/img/imgItmes/3347307.png',
    bg: 'bg-[#0a0a1a]'
  },
      {
    title: 'Full (Jiang Hu)',
    desc: 'You can use it to unlock Jiang Hu levels 9 at Eipc.',
    price: 50,
    img: '/img/imgItmes/3347309.png',
    bg: 'bg-[#0a0a1a]'
  },
   {
    title: '25,000 Cps',
    desc: 'Conquer Points',
    price: 10,
    img: '/img/imgItmes/z555.png',
    bg: 'bg-[#0a0a1a]'
    },
     {
    title: '50,000 Cps',
    desc: 'Conquer Points',
    price: 15,
    img: '/img/imgItmes/z555.png',
    bg: 'bg-[#0a0a1a]'
    },
    {
      title: '100,000 Cps',
      desc: 'Conquer Points',
      price: 25,
      img: '/img/imgItmes/z555.png',
      bg: 'bg-[#0a0a1a]'
      },
      {
        title: '200,000 Cps',
        desc: 'Conquer Points',
        price: 40,
        img: '/img/imgItmes/z555.png',
        bg: 'bg-[#0a0a1a]'
        },
]

const Stoer = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showImageModal, setShowImageModal] = useState(false); // for modal
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;
  const navigate = useNavigate();

  const handleBuy = (product: typeof products[0]) => {
    if (!username) {
      navigate('/login?redirect=/Stoer');
      return;
    }
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedProduct(null);
    setEmail('');
    setPhone('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم إرسال طلب الشراء بنجاح!');
    setShowForm(false);
    setSelectedProduct(null);
    setEmail('');
    setPhone('');
  };
  

  return (
    <div className="main-container">
      <div className="min-h-screen bg-gradient-to-b from-[#181828] to-[#0a0a1a] pb-30 pt-35">
        <div className="w-full h-64 flex flex-col items-center justify-center  to-[#0a0a1a] relative rounded-b-3xl shadow-lg mb-8">
        {/* Slider خلف العنوان مباشرة */}
        {(() => {
          // Slider state/hooks
          const sliderImages = [
            '/img/مشروع جديد (1).png',
            '/img/مشروع جديد (3).png',
            '/img/مشروع جديد (4).png',
            
          ];
          const [current, setCurrent] = React.useState(0);
          React.useEffect(() => {
            const interval = setInterval(() => {
              setCurrent((prev) => (prev + 1) % sliderImages.length);
            }, 1500);
            return () => clearInterval(interval);
          }, []);
          return (
            <img
              src={sliderImages[current]}
              alt="background slider"
              className="absolute top-20 left-1/2 -translate-x-1/2 object-cover opacity-80 border-spacing-y-3.5 rounded-b-3xl z-0 transition-all duration-1000"
              style={{ width: '1050px', height: '100px', transition: 'opacity 1s', objectFit: 'cover' }}
            />
          );
        })()}
        {/* Icon absolutely positioned and separated from slider/title */}
        <div style={{ position: 'absolute', right: 300, bottom: 80, zIndex: 30 }}>
          <img
            src="/img/logo2.png"
            alt="info"
            className="w-[80px] h-[80px] cursor-pointer hover:scale-110 transition animate-pulse"
            onClick={() => setShowImageModal(true)}
          />
        </div>
        <h1 className="text-4xl md:text-4xl font-extrabold text-white-100 mt-2 mb-2 tracking-tight drop-shadow-xl uppercase relative z-10">Store Market</h1>
        <div className="flex gap-2 text-white-100 text-base opacity-100 font-medium relative z-10">
          <span className="hover:text-blue-400 cursor-pointer transition">Home</span>
          <span className="mx-1">/</span>
          <span className="text-white-100">Store Market</span>
        </div>
      </div>
        <div className="w-full flex flex-wrap justify-center gap-10 mt-[-80px] z-10 relative">
          {products.map((p, i) => (
            <div key={i} className={`flex flex-col items-center rounded-3xl shadow-2xl border border-[#23233a] w-full max-w-xs md:max-w-sm ${p.bg} pb-8 pt-10 px-7 transition-transform duration-300 hover:scale-105 hover:shadow-blue-700/40 group`}> 
              <div className="flex items-center justify-center w-full h-40 mb-4">
                <img src={p.img} alt={p.title} className="object-contain h-32 w-32 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white-100 mb-2 text-center group-hover:text-blue-300 transition">{p.title}</h2>
              <div className="text-white-100 text-sm opacity-90 mb-4 text-center min-h-[40px]">
                {p.desc.split('\n').map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
              <div className="w-full border-t border-[#23233a] my-3"></div>
              <div className="text-3xl font-extrabold text-white-100 mb-3">${p.price}</div>
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white-100 font-bold py-2 rounded-xl mb-2 transition-all duration-200 mt-1 shadow-md hover:shadow-blue-700/30 text-lg"
                onClick={() => handleBuy(p)}
              >
                Buy Now
              </button>
              <div className="text-xs text-white-100 opacity-80 text-center mt-2">
                <span className="text-blue-300 underline cursor-pointer hover:text-blue-400 transition">Login</span> to purchase items.
              </div>
            </div>
          ))}
        </div>
        
        {showForm && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-[#18181c] p-8 rounded-xl shadow-lg w-full max-w-md relative">
              <button type="button" onClick={handleCloseForm} className="absolute top-2 right-2 text-white-100 text-xl">&times;</button>
              <h2 className="text-2xl font-bold text-white-100 mb-6 text-center">تأكيد الشراء</h2>
              <div className="mb-4 text-white-100 text-center">
                <div>المنتج: <b>{selectedProduct.title}</b></div>
                <div>السعر: <b>${selectedProduct.price}</b></div>
              </div>
              <label className="block mb-2 text-white-100">اسم المستخدم</label>
              <input type="text" className="w-full p-3 rounded-lg border border-gray-700 bg-[#ffffff] text-black mb-4" value={username || ''} disabled />
              <label className="block mb-2 text-white-100">البريد الإلكتروني</label>
              <input type="email" className="w-full p-3 rounded-lg border border-gray-700 bg-[#ffffff] text-black mb-4" value={email} onChange={e => setEmail(e.target.value)} required />
              <label className="block mb-2 text-white-100">رقم الهاتف</label>
              <input type="tel" className="w-full p-3 rounded-lg border border-gray-700 bg-[#ffffff] text-black mb-4" value={phone} onChange={e => setPhone(e.target.value)} required />
              <button type="submit" className="w-full py-3 rounded-lg font-bold text-lg mt-2 transition-all duration-200 bg-blue-300 hover:bg-blue-400 text-white">تأكيد الشراء</button>
            </form>
          </div>
        )}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center pt-10 z-50">
          <div className="bg-[#18181c] p-6 rounded-xl shadow-lg relative max-w-lg w-full flex flex-col items-center pt-12">
            <button
              type="button"
              onClick={() => setShowImageModal(false)}
              className="absolute top-5 right-5 text-white-100 text-2xl font-bold hover:text-blue-300 z-50"
              aria-label="Close"
              style={{zIndex: 100, pointerEvents: 'auto', background: '#222', borderRadius: '50%', width: 40, height: 40, }}
            >
              &times;
            </button>
            <img
              src="/img/z150.jpg"
              alt="Modal Preview"
              className="max-w-full max-h-[80vh] rounded-lg border border-gray-700"
            />
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Stoer