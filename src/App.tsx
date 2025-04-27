import Hero from "./components/Hero";
import "locomotive-scroll/src/locomotive-scroll.scss";
import { SmoothScrollProvider } from "./context/ScrollProviderContext";
 import { AboutUs } from "./components/AboutUs";
 
export const MainContainers = ".main-container"

function App() {
  return(
    <SmoothScrollProvider>
      <div className="main-container overflow-hidden">
        <Hero/>
          <AboutUs />
      </div>
    </SmoothScrollProvider>
  );
}

export default App;

