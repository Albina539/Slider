import mascot from "../../assets/logo.svg";
import { Button } from "../ui/button";

const FormFooter = () => {
  return (
    <section className="flex flex-col items-center mb-20">
      <div className="flex justify-between items-center gap-6 max-md:flex-col mb-20 w-full">
        <div className="flex items-center justify-between gap-8 flex-1">
          <img src={mascot} alt="mascot" className="md:w-20 w-15" />
          <img src={mascot} alt="mascot" className="md:w-20 w-15" />
          <img src={mascot} alt="mascot" className="md:w-20 w-15" />
        </div>
        <div className="flex items-center justify-center flex-1">
          <h2 className="uppercase text-slider-green flex flex-col items-center justify-center md:text-7xl text-5xl">
            <span>Boss</span>
            <span>Fight</span>
          </h2>
        </div>
        <div className="flex items-center justify-between gap-8 flex-1">
          <img src={mascot} alt="mascot" className="md:w-20 w-15" />
          <img src={mascot} alt="mascot" className="md:w-20 w-15" />
          <img src={mascot} alt="mascot" className="md:w-20 w-15" />
        </div>
      </div>
      <Button className="bg-slider-violet md:h-18 md:w-90 h-15 w-70 md:text-3xl text-2xl cursor-pointer">
        Отправить Slider'у
      </Button>
    </section>
  );
};

export default FormFooter;
