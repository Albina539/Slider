import { useState } from "react";
import SlideGrid from "./SlideGrid";
import RightContent from "./RightContent";
import ProjectActions from "./ProjectActions";
import stars from "../../assets/background-stars.svg";

const ProjectContent = () => {
  const [slides] = useState([
    { id: 1, title: "Введение", text: "Сгенерированный текст для слайда 1" },
    { id: 2, title: "Основная часть", text: "Сгенерированный текст для слайда 2" },
    { id: 3, title: "Заключение", text: "Сгенерированный текст для слайда 3" },
  ]);

  return (
    <div className="flex flex-col items-center justify-center text-center mb-12 md:my-25 my-15">
      {/* Звёзды и заголовки */}
      <div className="relative w-full md:mb-30 mb-15">
        <img
          src={stars}
          alt="Stars background"
          className="absolute left-1/2 -translate-x-1/2 md:-top-10 -top-3"
          width={1100}
        />
        <div className="flex flex-col items-center relative z-10">
          <h1 className="text-[#2EFF3C] md:text-5xl text-3xl max-sm:text-2xl text-center">
            YOU WIN
          </h1>
          <p className="text-center leading-none md:text-5xl text-3xl max-sm:text-2xl font-var2 text-white">
            Твоя презентация готова
          </p>
        </div>
      </div>

      {/* Две колонки */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-8">
        <div className="flex-1">
          <SlideGrid slides={slides} />
        </div>
        <div className="flex-1">
          <RightContent slides={slides} />
        </div>
      </div>

      
      <div className="w-full max-w-6xl mx-auto mt-8 flex justify-center">
        <ProjectActions />
      </div>
    </div>
  );
};

export default ProjectContent;