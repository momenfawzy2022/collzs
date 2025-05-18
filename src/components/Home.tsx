import "locomotive-scroll/dist/locomotive-scroll.css";
import { SmoothScrollProvider } from "../context/ScrollProviderContext";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger);
import Hero from './Hero';
import { AboutUs } from './AboutUs';

function Home() {
  return (

<SmoothScrollProvider>
  <div className="main-container overflow-hidden" data-scroll-container>
    <div className="scroll-content">
      <>
        <Hero />
        <AboutUs />
      </>
    </div>
  </div>
</SmoothScrollProvider>
  );
}

export default   Home;