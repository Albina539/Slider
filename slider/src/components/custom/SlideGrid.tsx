import { PenSquareSharp } from "pixelarticons/react";
import { Button } from "../ui/button";

interface Slide {
  id: number;
  title: string;
  text: string;
}

const SlideGrid = ({ slides = [] }: { slides: Slide[] }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="md:text-5xl text-3xl max-sm:text-2xl font-var2 text-white text-left">
        Редактирование слайдов
      </h2>
      {slides.map((slide) => (
        <div
          key={slide.id}
          className="flex items-center gap-4 p-4 w-full bg-[#1A0A3D]"
        >
          <div className="flex items-center justify-center h-23 md:h-30 w-15 md:w-20 bg-slider-light">
            <span className="text-4xl md:text-6xl font-thin text-black font-['Pixel_Font7']">
              {slide.id}
            </span>
          </div>

          <div className="flex justify-between gap-3 w-full h-full">
            <div className="flex flex-col justify-between h-full flex-1 min-w-0 text-left">
              <span className="font-medium leading-none text-white md:text-5xl text-3xl max-sm:text-2xl font-var2">
                {slide.title}
              </span>
              <p className="text-sm md:text-base text-white/70 leading-tight line-clamp-2 mt-7">
                {slide.text}
              </p>
            </div>
            <Button className="bg-transparent cursor-pointer" size={"icon-lg"}>
              <PenSquareSharp
                className="text-slider-light"
                style={{ width: "32px", height: "32px" }}
              />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlideGrid;
