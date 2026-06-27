import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "pixelarticons/react";

const PitchActions = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 flex justify-end">
        <button
          onClick={() => navigate("/project")}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-black font-medium text-sm hover:opacity-80 transition-opacity"
          style={{ backgroundColor: "hsla(124, 100%, 59%, 1)" }}
      >
        <ArrowLeft className="w-5 h-5" />
        Назад
      </button>
    </div>
  );
};

export default PitchActions;