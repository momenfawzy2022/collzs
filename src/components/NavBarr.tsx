import React, { useEffect } from 'react';
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from 'gsap';
import  {Buttons}  from './Buttons';
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { LuLogIn } from "react-icons/lu";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useSmoothScroll } from "../context/ScrollProviderContext";
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);
type NavItem = {
  to: string;
  label: string;
};

const navItems: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/download", label: "Download" },
  { to: "/register", label: "Register" },
  { to: "/Stoer", label: "Stoer" },
  { to: "/preregister", label: "Preregister" } // رابط صفحة الحجز
  // Add more items as needed



];
 

const NavBar = () => {
  const { progress } = useSmoothScroll();
  const [lastScrolly, setLastScrolly] = React.useState(0);
  const [isNavVisible, setIsNavVisible] = React.useState(true);
  const navContainer = React.useRef<HTMLHeadElement>(null);
  const [username, setUsername] = React.useState<string | null>(() => {
    return localStorage.getItem('username');
  });

  useEffect(() => {
    const handleStorage = () => {
      setUsername(localStorage.getItem('username'));
    };
    window.addEventListener('storage', handleStorage);
    // تحديث عند الدخول مباشرة
    setUsername(localStorage.getItem('username'));
    return () => window.removeEventListener('storage', handleStorage);
  }, []);
  // تحديث اسم المستخدم مباشرة بعد تسجيل الدخول
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem('username');
      setUsername((prev) => (prev !== stored ? stored : prev));
    }, 500);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (!navContainer.current) return;

    if (progress > lastScrolly) {
      setIsNavVisible(false);
     navContainer.current.classList.remove("floting-nav");

 }  else if (progress < lastScrolly) {
      setIsNavVisible(true);
      navContainer.current.classList.add("floting-nav");
  
  } else if (progress <= 10)  {
    setIsNavVisible(true);
    navContainer.current.classList.remove("floting-nav");
  }
    setLastScrolly(progress);
  },[progress,  lastScrolly]);
  useEffect(() => {
    gsap.to (navContainer.current,{ y:isNavVisible ? 0 : -100 , opacity:isNavVisible ? 1 : 0 , ease:"none" })
  },[isNavVisible]);
  return (
    <header ref={navContainer} 
    className={`z-50 duration-700 transition-all border-none fixed inset-0 sm:inset-x-6 h-20  bottom-5 `}>

      <nav className="p-4 py-5 z-50 flex items-center justify-between size-full">
        <div className="flex items-center gap-3 ">
          <img src="./img\zhong_00011.png" alt="logo" className="w-20" />
          {username ? (
            <>
              <Buttons
                className='!text-violet-100'
                rightIcon={<FaUser />}
                text={username && username.split('@')[0]}
                backgroundColor="!bg-blue-100"
                disabled
              />
            </>
          ) : (
            <Link to="/login">
              <Buttons className='!text-violet-100 ' rightIcon={<LuLogIn />} text="login" backgroundColor="!bg-blue-100" />
            </Link>
          )}
        </div>
        <div className="gap-4 flex items-center">
          {navItems.map((item) => (
            <Link to={item.to} className="nav-hover-btn" key={item.label}>
              {item.label}
            </Link>
          ))}
          {username && (
            <>
              <Buttons
                className='!text-violet-100 ml-2'
                rightIcon={<IoIosLogOut />}
                text="Log out"
                backgroundColor="!bg-blue-100"
                onClick={() => {
                  localStorage.removeItem('username');
                  setUsername(null);
                }}
              />
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default NavBar