import {
  BookOpenSharp,
  ChartSharp,
  DiamondGem,
  Heart,
  MagicEdit,
  Robot,
} from "pixelarticons/react";
import React from "react";
import { SlidersStyleType } from "../../types";

const DesignStyles = [
  {
    title: SlidersStyleType.PROFESSIONAL,
    icon: <BookOpenSharp style={{ width: "116px", height: "116px" }} />,
    colorBg: "bg-slider-dark",
    colorTxt: "text-slider-light",
  },
  {
    title: SlidersStyleType.CREATIVE,
    icon: <MagicEdit style={{ width: "116px", height: "116px" }} />,
    colorBg: "bg-slider-violet",
    colorTxt: "text-slider-blue",
  },
  {
    title: SlidersStyleType.MODERN,
    icon: <Heart style={{ width: "116px", height: "116px" }} />,
    colorBg: "bg-slider-light",
    colorTxt: "text-slider-violet",
  },
  {
    title: SlidersStyleType.ELEGANT,
    icon: <DiamondGem style={{ width: "116px", height: "116px" }} />,
    colorBg: "bg-slider-violet",
    colorTxt: "text-slider-blue",
  },
  {
    title: SlidersStyleType.STARTUP,
    icon: <Robot style={{ width: "116px", height: "116px" }} />,
    colorBg: "bg-slider-light",
    colorTxt: "text-slider-violet",
  },
  {
    title: SlidersStyleType.MINIMAL,
    icon: <ChartSharp style={{ width: "116px", height: "116px" }} />,
    colorBg: "bg-slider-dark",
    colorTxt: "text-slider-light",
  },
];

interface SlidersStyleProps {
  selectedStyle: SlidersStyleType;
  setStyle: React.Dispatch<React.SetStateAction<SlidersStyleType>>;
}

const SlidersStyle: React.FC<SlidersStyleProps> = ({
  selectedStyle,
  setStyle,
}) => {
  return (
    <section>
      <div className="flex items-center gap-6 mb-15">
        <h2 className="md:text-3xl text-2xl font-medium text-black bg-slider-green md:px-8 md:py-2 px-6 w-fit h-fit text-center">
          Level 1
        </h2>
        <p className="text-white font-var2 md:text-5xl text-3xl max-sm:text-2xl">
          Выбери стиль
        </p>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-2 max-sm:grid-cols-1 gap-15">
        {DesignStyles.map((style) => {
          return (
            <button
              className={`cursor-pointer ${style.title === selectedStyle ? "scale-105" : ""}`}
              onClick={() => setStyle(style.title)}
              type="button"
            >
              <div
                className={`lg:h-50 md:h-40 h-50 flex items-center justify-center ${style.title === selectedStyle ? "bg-slider-green text-black" : `${style.colorTxt} ${style.colorBg}`}`}
              >
                {style.icon}
              </div>
              <div className="bg-white lg:text-5xl md:text-4xl text-3xl font-var2 flex items-center justify-center lg:py-4 md:py-3 py-2">
                <p>{style.title}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SlidersStyle;
