import type React from "react";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Close } from "pixelarticons/react";

interface ColorStyleProps {
  colorPrimary: string;
  colorSecondary: string;
  setColorPrimary: React.Dispatch<React.SetStateAction<string>>;
  setColorSecondary: React.Dispatch<React.SetStateAction<string>>;
}

const ColorStyle: React.FC<ColorStyleProps> = ({
  colorPrimary,
  colorSecondary,
  setColorPrimary,
  setColorSecondary,
}) => {
  return (
    <section>
      <div className="flex items-center gap-6 mb-15">
        <h2 className="md:text-3xl text-2xl font-medium text-black bg-slider-green md:px-8 md:py-2 px-6 w-fit h-fit text-center">
          Level 3
        </h2>
        <p className="text-white font-var2 md:text-5xl text-3xl max-sm:text-2xl">
          Выбери цвета
        </p>
      </div>

      <FieldGroup className="md:items-end max-md:flex-col max-md:items-center">
        <Field className="flex! items-center! justify-center! gap-0! flex-1 min-w-0">
          <FieldLabel className="text-slider-dark md:text-4xl text-2xl text-center! flex items-center justify-center">
            Основной цвет
          </FieldLabel>
          <FieldDescription className="text-white font-var2 md:text-4xl text-2xl text-center mb-10">
            Напиши только один
          </FieldDescription>
          <Input
            className="bg-white placeholder:text-black md:h-15! h-10! md:text-3xl! text-2xl! font-var2 w-full min-w-30"
            placeholder="Пиши сюда..."
            value={colorPrimary}
            onChange={(e) => setColorPrimary(e.target.value)}
          />
        </Field>
        <div className="text-slider-green flex flex-1 justify-center">
          <Close style={{ width: "56px", height: "56px" }} />
        </div>
        <Field className="flex! items-center! justify-center! gap-0! flex-1 min-w-0">
          <FieldLabel className="text-slider-light md:text-4xl text-2xl text-center! flex items-center justify-center">
            Дополнительные цвета
          </FieldLabel>
          <FieldDescription className="text-white font-var2 md:text-4xl text-2xl text-center mb-10">
            Можешь выбрать несколько
          </FieldDescription>
          <Input
            className="bg-white placeholder:text-black md:h-15! h-10! md:text-3xl! text-2xl! font-var2 w-full min-w-30"
            placeholder="Пиши сюда..."
            value={colorSecondary}
            onChange={(e) => setColorSecondary(e.target.value)}
          />
        </Field>
      </FieldGroup>
    </section>
  );
};

export default ColorStyle;
