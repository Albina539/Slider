import RightContent from "./RightContent";
import ProjectActions from "./ProjectActions";
import stars from "../../assets/background-stars.svg";
import { Skeleton } from "../ui/skeleton";

interface ProjectContentProps {
  projectDetail: any;
  loading: boolean;
  onExport: () => void;
  exporting: boolean;
}

const ProjectContent = ({
  projectDetail,
  loading,
  onExport,
  exporting,
}: ProjectContentProps) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center text-center mb-12 md:my-25 my-15">
        <div className="relative w-full md:mb-30 mb-15">
          <img
            src={stars}
            alt="Stars background"
            className="absolute left-1/2 -translate-x-1/2 md:-top-10 -top-3"
            width={1100}
          />
          <div className="flex flex-col items-center relative z-10">
            <h1 className="text-slider-green md:text-6xl text-4xl max-sm:text-2xl text-center">
              YOU WIN
            </h1>
            <p className="text-center leading-none md:text-5xl text-3xl max-sm:text-2xl font-var2 text-white">
              Твоя презентация готова
            </p>
          </div>
        </div>

        <div className="flex max-lg:flex-col-reverse w-full max-w-6xl mx-auto gap-8">
          <div className="flex-1">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-15 w-full rounded-2xl mb-4" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center mb-12 md:my-25 my-15">
      <div className="relative w-full md:mb-30 mb-15">
        <img
          src={stars}
          alt="Stars background"
          className="absolute left-1/2 -translate-x-1/2 md:-top-10 -top-3"
          width={1100}
        />
        <div className="flex flex-col items-center relative z-10">
          <h1 className="text-slider-green md:text-6xl text-4xl max-sm:text-3xl text-center">
            YOU WIN
          </h1>
          <p className="text-center leading-none md:text-5xl text-3xl max-sm:text-2xl font-var2 text-white">
            Твоя презентация готова
          </p>
        </div>
      </div>

      <div className="flex w-full max-sm:h-100 md:h-200 lg:h-full max-w-6xl mx-auto">
        <RightContent htmlPresentation={projectDetail.htmlPresentation} />
      </div>

      <div className="w-full max-w-6xl mx-auto mt-18 flex justify-center">
        <ProjectActions onExport={onExport} exporting={exporting} />
      </div>
    </div>
  );
};

export default ProjectContent;
