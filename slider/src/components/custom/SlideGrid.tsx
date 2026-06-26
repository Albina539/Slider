import { PenSquareSharp } from "pixelarticons/react";

interface Slide {
  id: number;
  title: string;
  text: string;
}

const SlideGrid = ({ slides = [] }: { slides: Slide[] }) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[812px]">
      <h2 className="text-2xl md:text-5xl text-3xl max-sm:text-2xl font-var2 text-white text-left font-['Pixel_Font7']">
        Редактирование слайдов
      </h2>
      {slides.map((slide) => (
        <div
          key={slide.id}
          className="flex items-center gap-4 p-4 relative w-full h-[277px] bg-[#1A0A3D] rounded-lg"
        >
          {/* Розовый квадрат 83x128 прижат влево по середине */}
          <div className="flex flex-col items-center justify-center flex-shrink-0 w-[60px] h-[128px] md:w-[83px] md:h-[128px] bg-[#FFB3F0]">
            <span className="text-4xl md:text-6xl font-thin text-black font-['Pixel_Font7']">
              {slide.id}
            </span>
          </div>

          {/* Заголовок и текст */}
          <div className="flex flex-col flex-1 min-w-0 text-left -mt-35">
            <span className="font-medium leading-none text-white md:text-5xl text-3xl max-sm:text-2xl font-var2 font-['Pixel_Font7'] truncate">
              {slide.title}
            </span>
            <p className="text-sm md:text-base text-white/70 leading-tight line-clamp-2 mt-7">
              {slide.text}
            </p>
          </div>

          {/* Иконка в правом верхнем углу */}
          <PenSquareSharp className="absolute top-1 right-1 text-[#FFB3F0] w-8 h-8 md:w-12 md:h-12" />
        </div>
      ))}
    </div>
  );
};

export default SlideGrid;