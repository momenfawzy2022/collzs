import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // 👈 لو بتستخدم React Router
import "locomotive-scroll/dist/locomotive-scroll.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

const useLocoScroll = () => {
  gsap.registerPlugin(ScrollTrigger);
  const location = useLocation(); // ✅

  const [locoScroll, setLocoScroll] = useState<LocomotiveScroll | null>(null);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const scrollEl: HTMLElement | null = document.querySelector(".main-container");
    if (!scrollEl) return;

    const locoScrollInstance = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1.5,
    });

    setLocoScroll(locoScrollInstance);

    locoScrollInstance.on("scroll", ScrollTrigger.update);
    locoScrollInstance.on("scroll", (args) => setProgress(args.scroll.y));

    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        return arguments.length
          ? locoScrollInstance.scrollTo(value || 0, 0)
          : locoScrollInstance.scroll.instance?.scroll.y || 0;
      },
      scrollLeft(value) {
        return arguments.length
          ? locoScrollInstance.scrollTo(value || 0, 0)
          : locoScrollInstance.instance?.scroll.x || 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollEl?.style.transform ? "transform" : "fixed",
    });

    const lsUpdate = () => {
      if (locoScrollInstance) locoScrollInstance.update();
    };

    ScrollTrigger.addEventListener("refresh", lsUpdate);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", lsUpdate);
      locoScrollInstance.destroy();
    };

  }, [location.pathname]); // 👈 دي أهم حاجة

  return { locoScroll, progress };
};

export default useLocoScroll;
export { useLocoScroll }; // 👈 تصدير الدالة