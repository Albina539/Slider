import { Download, ArrowRight } from "pixelarticons/react";
import { Button } from "../ui/button";
import { Link, useParams } from "react-router-dom";

interface ProjectActionsProps {
  onExport: () => void;
  exporting: boolean;
}

const ProjectActions = ({ onExport, exporting }: ProjectActionsProps) => {
  const { projectId } = useParams();
  return (
    <div className="flex gap-6 max-md:flex-col max-md:items-center justify-center md:items-center w-full">
      <Button
        onClick={onExport}
        disabled={exporting}
        className="max-md:w-full flex items-center justify-center gap-3 lg:px-8 md:px-6 px-4 py-4 bg-slider-violet text-white font-medium lg:text-2xl md:text-xl text-lg h-14 cursor-pointer"
      >
        <Download style={{ width: "36px", height: "36px" }} />
        <span>Экспортировать в PPT</span>
      </Button>

      <Link
        to={`/workspace/project/${projectId}/pitch`}
        className="max-md:w-full"
      >
        <Button className="max-md:w-full flex items-center justify-center gap-3 lg:px-8 md:px-6 px-4 py-4 bg-slider-green text-black font-medium lg:text-2xl md:text-xl text-lg h-14 cursor-pointer">
          <span>Далее</span>
          <ArrowRight style={{ width: "36px", height: "36px" }} />
        </Button>
      </Link>
    </div>
  );
};

export default ProjectActions;
