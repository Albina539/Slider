import "./App.css";
import starsBg from "../src/assets/stars-bg2.svg";
import cloudBg from "../src/assets/cloud-down.svg";
import Hero from "./components/custom/Hero";
import { ArrowBigUp } from "pixelarticons/react";
import GideSection from "./components/custom/GideSection";

function App() {
  return (
    <div className="h-full min-h-screen w-full bg-black">
      <Hero></Hero>
      <GideSection />
      <div className="md:mb-10 mb-5 flex justify-center">
        <img src={starsBg} alt="stars-bg" width={1100} />
      </div>
      <div className="flex justify-center items-centers flex-col relative">
        <div className="absolute inset-0 w-full">
          <img
            src={cloudBg}
            alt="Cloud background"
            className="w-full md:h-full h-95 object-cover overflow-visible"
          />
        </div>
        <div className="flex items-center justify-center pt-50 relative z-10 md:h-120 h-90">
          <a href="#">
            <div className="flex gap-10 justify-center items-center">
              <ArrowBigUp
                style={{ width: "96px", height: "96px" }}
                className="text-white"
              />
              <h2 className="text-white md:text-7xl text-4xl">Вверх</h2>
              <ArrowBigUp
                style={{ width: "96px", height: "96px" }}
                className="text-white"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
