import React from 'react'
import "locomotive-scroll/dist/locomotive-scroll.css";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger);



const products = [
  {
    title: 'VIP Token (30 DAY Token)',
    desc: 'Use it to gain 30 day benifits of VIP.',
    price: 20,
    img: '/img/vip.png',
    bg: 'bg-[#0a0a1a]'
  },
  {
    title: 'VIP Token (7 DAY Instant)',
    desc: 'Direct active 7 days VIP.',
    price: 7,
    img: '/img/vip.png',
    bg: 'bg-[#0a0a1a]'
  },
  {
    title: '10 Funds',
    desc: 'Can change color for 10 Funds.',
    price: 10,
    img: '/img/classe/Adobe Express - file (1).png',
    bg: 'bg-[#0a0a1a]'
  },
    {
    title: '10 Funds',
    desc: 'Can change color for 10 Funds.',
    price: 10,
    img: '/img/classe/Adobe Express - file (1).png',
    bg: 'bg-[#0a0a1a]'
  },
    {
    title: 'VIP Token (7 DAY Instant)',
    desc: 'Direct active 7 days VIP.',
    price: 7,
    img: '/img/vip.png',
    bg: 'bg-[#0a0a1a]'
  },
  {
    title: '10 Funds',
    desc: 'Can change color for 10 Funds.',
    price: 10,
    img: '/img/classe/Adobe Express - file (1).png',
    bg: 'bg-[#0a0a1a]'
  },
    {
    title: '10 Funds',
    desc: 'Can change color for 10 Funds.',
    price: 10,
    img: '/img/classe/Adobe Express - file (1).png',
    bg: 'bg-[#0a0a1a]'
  },
      {
    title: '10 Funds',
    desc: 'Can change color for 10 Funds.',
    price: 10,
    img: '/img/classe/Adobe Express - file (1).png',
    bg: 'bg-[#0a0a1a]'
  }
]

const Stoer = () => {
  const handleBuy = (product: typeof products[0]) => {
    // هنا يمكنك ربط الشراء الحقيقي أو فتح نافذة دفع
    alert(`You are trying to buy: ${product.title} for $${product.price}`);
  };

  return (
    <div className="main-container">
      <div className="min-h-screen bg-gradient-to-b from-[#181828] to-[#0a0a1a] pb-30 pt-35">
        <div className="w-full h-64 flex flex-col items-center justify-center bg-gradient-to-b from-blue-900/80 to-[#0a0a1a] relative rounded-b-3xl shadow-lg mb-8">
        {/* صورة خلفية خلف العنوان مباشرة */}
        <img src="/img/bg3.jpg" alt="background" className="absolute  top-20 w-full h-96 object-cover opacity-40 border-spacing-y-3.5 rounded-b-3xl z-0" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-white-100 mt-2 mb-2 tracking-tight drop-shadow-xl uppercase relative z-10">Store Market</h1>
        <div className="flex gap-2 text-white-100 text-base opacity-90 font-medium relative z-10">
          <span className="hover:text-blue-400 cursor-pointer transition">Home</span>
          <span className="mx-1">/</span>
          <span className="text-blue-300">Store Market</span>
        </div>
      </div>
        <div className="w-full flex flex-wrap justify-center gap-10 mt-[-80px] z-10 relative">
          {products.map((p, i) => (
            <div key={i} className={`flex flex-col items-center rounded-3xl shadow-2xl border border-[#23233a] w-full max-w-xs md:max-w-sm ${p.bg} pb-8 pt-10 px-7 transition-transform duration-300 hover:scale-105 hover:shadow-blue-700/40 group`}> 
              <div className="flex items-center justify-center w-full h-40 mb-4">
                <img src={p.img} alt={p.title} className="object-contain h-32 w-32 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white-100 mb-2 text-center group-hover:text-violet-300 transition">{p.title}</h2>
              <p className="text-white-100 text-sm opacity-90 mb-4 text-center min-h-[40px]">{p.desc}</p>
              <div className="w-full border-t border-[#23233a] my-3"></div>
              <div className="text-3xl font-extrabold text-white-100 mb-3">${p.price}</div>
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white-100 font-bold py-2 rounded-xl mb-2 transition-all duration-200 mt-1 shadow-md hover:shadow-blue-700/30 text-lg"
                onClick={() => alert(`You are buying: ${p.title} for $${p.price}`)}
              >
                Buy Now
              </button>
              <div className="text-xs text-white-100 opacity-80 text-center mt-2">
                <span className="text-blue-300 underline cursor-pointer hover:text-blue-400 transition">Login</span> to purchase items.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Stoer