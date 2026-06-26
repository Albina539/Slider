import { Download, ArrowRight } from "pixelarticons/react";

const ProjectActions = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Кнопка 1: Экспортировать в PPT */}
      <button
        className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-white font-medium text-base hover:opacity-90 transition-opacity ml-[-73px]"
        style={{
          backgroundColor: "hsla(284, 69%, 44%, 1)",
        }}
      >
        <Download className="w-5 h-5" />
        Экспортировать в PPT
      </button>

      {/* Кнопка 2: Далее */}
      <button
        className="flex items-center justify-between gap-3 px-8 py-4 rounded-lg text-black font-medium text-base hover:opacity-90 transition-opacity ml-[15px]"
        style={{
          backgroundColor: "hsla(124, 100%, 59%, 1)",
        }}
      >
        <span>Далее</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProjectActions;