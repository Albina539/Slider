// import { useState } from "react";
// import { useParams } from "react-router-dom";

// type Project = {
//   userInputPrompt: string;
//   projectId: string;
//   createdAt: string;
// };
import stars from "../assets/background-stars.svg";
import mascot from "../assets/logo.svg";
import ColorStyle from "../components/custom/ColorStyle";
import FontStyle from "../components/custom/FontStyle";
import FormFooter from "../components/custom/FormFooter";
import SlidersStyle from "../components/custom/SlidersStyle";

const ProjectOutline = () => {
  // const { projectId } = useParams();
  // const [projectDetail, setProjectDetail] = useState<Project>();
  // const GetProjectDetail = () => {
  //   console.log(projectId);
  // };
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-1 w-full mx-auto md:px-25 px-8 py-8">
        <div className="relative w-full md:mb-30 mb-15 md:my-25 my-15">
          <img
            src={stars}
            alt="Stars background"
            className="absolute left-1/2 -translate-x-1/2 md:-top-5 -top-3"
            width={1100}
          />
          <div className="flex flex-col items-center relative z-10">
            <h1 className="text-[#2EFF3C] md:text-5xl text-3xl max-sm:text-2xl text-center">
              <div>
                <span>Теперь выбери параметры </span>
                <div className="inline-block">
                  <img src={mascot} alt="logo" className="md:w-25 w-10" />
                  <span className="line-through">персонажа</span>
                </div>
              </div>

              <span className="text-[#6900BF]"> презентации</span>
            </h1>
          </div>
        </div>

        <form className="space-y-50">
          <SlidersStyle />
          <FontStyle />
          <ColorStyle />
          <FormFooter />
        </form>
      </main>
    </div>
  );
};

export default ProjectOutline;
