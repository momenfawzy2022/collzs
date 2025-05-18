import Hero from "./components/Hero";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { SmoothScrollProvider } from "./context/ScrollProviderContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AboutUs } from "./components/AboutUs";
import  NavBar  from "./components/NavBarr";
import DownloadPage from "./components/DownloadPage";
import Register from "./components/Register";

export const MainContainers = ".main-container"

function App() {
  return(
    <SmoothScrollProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<div className="main-container overflow-hidden"><Hero/><AboutUs/></div>} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </SmoothScrollProvider>
  );
}

export default App;

