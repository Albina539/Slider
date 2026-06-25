import {
  BookOpenSharp,
  ChartSharp,
  DiamondGem,
  Heart,
  MagicEdit,
  Robot,
} from "pixelarticons/react";
import { useState } from "react";

const DesignStyles = [
  {
    title: "Professional",
    icon: <BookOpenSharp style={{ width: "116px", height: "116px" }} />,
    colorBg: "bg-slider-dark",
    colorTxt: "text-slider-light",
  },
  {
    title: "Creative",
    icon: <MagicEdit style={{ width: "116px", height: "116px" }} />,
    colorBg: "bg-slider-violet",
    colorTxt: "text-slider-blue",
  },
  {
    title: "Modern",
    icon: <Heart style={{ width: "116px", height: "116px" }} />,
    colorBg: "bg-slider-light",
    colorTxt: "text-slider-violet",
  },
  {
    title: "Elegant",
    icon: <DiamondGem style={{ width: "116px", height: "116px" }} />,
    colorBg: "bg-slider-violet",
    colorTxt: "text-slider-blue",
  },
  {
    title: "Startup pitch",
    icon: <Robot style={{ width: "116px", height: "116px" }} />,
    colorBg: "bg-slider-light",
    colorTxt: "text-slider-violet",
  },
  {
    title: "Minimal",
    icon: <ChartSharp style={{ width: "116px", height: "116px" }} />,
    colorBg: "bg-slider-dark",
    colorTxt: "text-slider-light",
  },
];

const SlidersStyle = () => {
  const [selectedStyle, setSelectedStyle] = useState<string>();
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
            <div
              className={`cursor-pointer ${style.title === selectedStyle ? "scale-105 border-2 border-slider-green" : ""}`}
              onClick={() => setSelectedStyle(style.title)}
            >
              <div
                className={`${style.colorBg} h-50 flex items-center justify-center ${style.colorTxt}`}
              >
                {style.icon}
              </div>
              <div className="bg-white md:text-5xl text-3xl font-var2 flex items-center justify-center py-4">
                <p>{style.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SlidersStyle;
