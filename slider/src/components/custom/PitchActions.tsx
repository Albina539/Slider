import { ArrowLeft } from "pixelarticons/react";
import { Link } from "react-router-dom";

const PitchActions = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 flex justify-end">
      <Link
        to="/project"
        className="flex items-center justify-between gap-3 lg:px-5 md:px-4 px-3 py-4 bg-slider-green text-black font-medium lg:text-2xl md:text-xl text-lg h-12 transition-all hover:scale-105"
      >
        <ArrowLeft style={{ width: "36px", height: "36px" }} />
        <span>Назад</span>
      </Link>
    </div>
  );
};

export default PitchActions;
