import React from 'react'
import { useEffect, useRef } from 'react';
import  Buttons  from "./Buttons";
import { TiLocation } from 'react-icons/ti';
import { useSmoothScroll } from "../context/ScrollProviderContext";
const navItems = ["Nexus", "Forum", "Shop", "Support", "Download", "Register"];

const NavBar = () => {
    const { progress } = useSmoothScroll();
    const [lastScrolly, setLastScrolly] = React.useState(0);
    const [isNavVisible, setIsNavVisible] = React.useState(true);
    const navContainer = useRef<HTMLHeadElement>(null);
    useEffect(() => {
      if (!navContainer.current) return;
      if (progress > lastScrolly)
         { setIsNavVisible(false);
        navContainer.current.classList.remove("floating-nav");
      } else if (progress < lastScrolly) {
        setIsNavVisible(true);
        navContainer.current.classList.add("floating-nav");
      } else if (progress <= 10) {
        setIsNavVisible(true);
        navContainer.current.classList.remove("floating-nav");

      }
      setLastScrolly(progress);
    }, [progress, lastScrolly]);

    useEffect(() => {
       gsap.to (navContainer.current,{y:isNavVisible? 0: -100 , opacity:isNavVisible? 1: 0 , ease:'none'})
      },[isNavVisible]);
  
    return (
      <header ref={navContainer}
       className={`z-50 duration-700 transition-all fixed inset-0 sm:inset-x-6 h-16`}>
        <nav className="p-4 py-5 flex items-center justify-between size-full">
          <div className="flex items-center gap-3">
            <img src="/img/logo.png" alt="logo" className="w-12" />
            <Buttons className="!text-blue-200" rightIcon={<TiLocation />} text="Products" backgroundColor="" />
          </div>
          <div className="pan-4 flex items-center">
            {navItems.map((item) => (
                <button className="nav-hover-btn">{item}</button>
            ))}
          </div> {""}
        </nav>
      </header>
    );
  };
  
  export default NavBar;