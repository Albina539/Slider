import { useState } from "react";
import stars from "../../assets/background-stars.svg";
import PitchActions from "./PitchActions";
import logo from "../../assets/logo.svg";

const PitchContent = () => {
  // Состояние для текста выступления 
  const [speechText, setSpeechText] = useState(`
    Введите текст для вашего выступления...
  `);

  return (
    <div className="flex flex-col items-center justify-center text-center mb-12 md:my-25 my-15">
      {/* Звёзды + логотип + заголовки */}
      <div className="relative w-full md:mb-30 mb-15">
        <img
          src={stars}
          alt="Stars background"
          className="absolute left-1/2 -translate-x-1/2 md:-top-10 -top-3"
          width={1100}
        />
        <div className="flex flex-col items-center relative z-10">
          <img src={logo} alt="logo" className="md:w-25 w-15" />
          <h1 className="text-slider-green md:text-6xl text-4xl max-sm:text-2xl text-center">
            BONUS LEVEL
          </h1>
          <p className="text-center leading-none md:text-5xl text-3xl max-sm:text-2xl font-var2 text-white">
            Подготовка к выступлению
          </p>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <textarea
          className="w-full min-h-[300px] bg-white rounded-lg p-6 md:p-8 text-black text-base md:text-lg leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-[#2EFF3C] transition"
          value={speechText}
          onChange={(e) => setSpeechText(e.target.value)}
          placeholder="Введите текст для вашего выступления..."
        />
      </div>

      {/* Кнопки */}
      <PitchActions />
    </div>
  );
};

export default PitchContent;