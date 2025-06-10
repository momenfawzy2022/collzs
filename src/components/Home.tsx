import "locomotive-scroll/dist/locomotive-scroll.css";
import { SmoothScrollProvider } from "../context/ScrollProviderContext";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger);
import Hero from './Hero';
import { AboutUs } from './AboutUs';
import Contact from "./Contact";
import Footer from "./Footer";


function Home() {
  return (
        <SmoothScrollProvider>
        
    <div className="main-container ">
      <Hero />
      <AboutUs />
      <Contact />
      <Footer />
    </div>
        </SmoothScrollProvider>
    
  );
}

export default   Home;