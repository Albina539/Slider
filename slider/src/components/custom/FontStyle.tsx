import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import stars from "../../assets/background-stars.svg";
import type { FontStyleType } from "../../types";
import { FONTS } from "../../constants";

interface FontStyleProps {
  font: string;
  setFont: React.Dispatch<React.SetStateAction<FontStyleType>>;
}

const FontStyle: React.FC<FontStyleProps> = ({ font, setFont }) => {
  return (
    <section>
      <div className="flex items-center gap-6 mb-15">
        <h2 className="md:text-3xl text-2xl font-medium text-black bg-slider-green md:px-8 md:py-2 px-6 w-fit h-fit text-center">
          Level 2
        </h2>
        <p className="text-white font-var2 md:text-5xl text-3xl max-sm:text-2xl">
          Выбери шрифт
        </p>
      </div>

      <div className="relative w-full md:mb-30 mb-15 md:my-25 my-15">
        <img
          src={stars}
          alt="Stars background"
          className="absolute left-1/2 -translate-x-1/2 md:-top-5 -top-3 z-0"
          width={1000}
        />
        <div className="flex justify-center items-center relative z-10">
          <Select
            value={font}
            onValueChange={(value) => setFont(value as FontStyleType)}
          >
            <SelectTrigger className="w-100 bg-white md:h-15! md:text-xl">
              <SelectValue placeholder="Шрифт не выбран" />
            </SelectTrigger>
            <SelectContent className=" bg-white">
              <SelectGroup>
                <SelectLabel>Стиль шрифта</SelectLabel>
                {FONTS.map((font) => {
                  return (
                    <SelectItem value={font} key={font}>
                      {font}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
};

export default FontStyle;
