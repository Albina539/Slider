import { PenSquareSharp } from "pixelarticons/react";
import { Button } from "../ui/button";
import type React from "react";
import EditDialog from "./EditDialog";
import type { SlideContent } from "../../types";

interface SlideGridProps {
  slides: SlideContent[];
  onUpdateOutline: (slideNo: string, value: Partial<SlideContent>) => void;
}

const SlideGrid: React.FC<SlideGridProps> = ({
  slides = [],
  onUpdateOutline,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="md:text-5xl text-3xl max-sm:text-2xl font-var2 text-white text-left">
        Редактирование слайдов
      </h2>
      {slides.map((slide) => (
        <div
          key={slide.slideNo}
          className="flex items-center gap-4 p-4 w-full bg-[#1A0A3D]"
        >
          <div className="flex items-center justify-center h-23 md:h-30 w-15 md:w-20 bg-slider-light">
            <span className="text-4xl md:text-6xl font-thin text-black font-['Pixel_Font7']">
              {slide.slideNo}
            </span>
          </div>

          <div className="flex justify-between items-start gap-3 w-full h-full">
            <div className="flex flex-col justify-between h-full flex-1 min-w-0 text-left">
              <span className="font-medium leading-none text-white md:text-5xl text-3xl max-sm:text-2xl font-var2">
                {slide.slidePoint}
              </span>
              <p className="text-sm md:text-base text-white/70 leading-tight mt-7">
                {slide.outline}
              </p>
            </div>
            <EditDialog slideData={slide} onUpdate={onUpdateOutline}>
              <Button
                className="bg-transparent cursor-pointer"
                size={"icon-lg"}
              >
                <PenSquareSharp
                  className="text-slider-light"
                  style={{ width: "32px", height: "32px" }}
                />
              </Button>
            </EditDialog>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlideGrid;
