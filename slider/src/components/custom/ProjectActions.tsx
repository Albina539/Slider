import { Download, ArrowRight } from "pixelarticons/react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const ProjectActions = () => {
  return (
    <div className="flex gap-6 max-md:flex-col justify-center md:items-center w-full">
      <Button className="flex items-center justify-center gap-3 lg:px-8 md:px-6 px-4 py-4 bg-slider-violet text-white font-medium lg:text-2xl md:text-xl text-lg h-14 cursor-pointer">
        <Download style={{ width: "36px", height: "36px" }} />
        <span>Экспортировать в PPT</span>
      </Button>

      <Link to="/pitch">
        <Button className="flex items-center justify-between gap-3 lg:px-8 md:px-6 px-4 py-4 bg-slider-green text-black font-medium lg:text-2xl md:text-xl text-lg h-14 cursor-pointer">
          <span>Далее</span>
          <ArrowRight style={{ width: "36px", height: "36px" }} />
        </Button>
      </Link>
    </div>
  );
};

export default ProjectActions;
