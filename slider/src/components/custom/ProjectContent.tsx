import { useState } from "react";
import SlideGrid from "./SlideGrid";
import RightContent from "./RightContent";
import ProjectActions from "./ProjectActions";
import stars from "../../assets/background-stars.svg";
import { Skeleton } from "@/components/ui/skeleton";

type Props={
    loading:boolean
}

const ProjectContent = ({loading}: Props) => {
   const [slides] = useState([
     { id: 1, title: "Введение", text: "Сгенерированный текст для слайда 1" },
     { id: 2, title: "Основная часть", text: "Сгенерированный текст для слайда 2" },
     { id: 3, title: "Заключение", text: "Сгенерированный текст для слайда 3" },
   ]);

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
              <Skeleton key={item} className='h-[60px] w-full rounded-2xl mb-4'/>
            ))}
          </div>
          <div className="flex-1">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className='h-[60px] w-full rounded-2xl mb-4'/>
            ))}
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto mt-8 flex justify-center">
          <ProjectActions />
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
    }

export default ProjectContent;
