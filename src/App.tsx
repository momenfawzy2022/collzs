import "locomotive-scroll/dist/locomotive-scroll.css";
import { SmoothScrollProvider } from "./context/ScrollProviderContext";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBarr";
import LoginForm from "./components/LoginForm";
import DownloadPage from "./components/DownloadPage";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import OTPVerification from "./components/OTPVerification";
import { useEffect } from "react";
import Hero from "./components/Hero";
import { AboutUs } from "./components/AboutUs";
import Pin from "./components/Pin";
import  Contact from "./components/Contact";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import Stoer from "./components/Stoer";
import Preregister from "./components/preregister";

export const MainContainers = ".main-container";

// Scroll to top and force re-render on every route change
function App() {
  const location = useLocation();
  useEffect(() => {
    // Scroll to top and trigger LocomotiveScroll update if موجود
    window.scrollTo(0, 0);
    setTimeout(() => {
      const event = new Event('resize');
      window.dispatchEvent(event);
    }, 100);
  }, [location.pathname]);
  return (
    <SmoothScrollProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<div className="main-container">
          <div className="scroll-content">
            <Hero />
            <AboutUs />
            <Pin/>
            <Slider images={[
              '/img/version1.png',
              '/img/version2.png',
              '/img/version3.png',
              '/img/version4.png',
              '/img/version9.png',
            ]} />
            <Contact/>
            <Footer/>
            
          </div>
        </div>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/otp" element={<OTPVerification />} />
        <Route path="/Stoer" element={<Stoer />} />
        <Route path="/preregister" element={<Preregister />} />
      </Routes>
    </SmoothScrollProvider>
  );
}

export default App;

