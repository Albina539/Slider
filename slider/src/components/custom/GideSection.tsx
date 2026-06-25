import GideSchema from "./GideSchema";
import stars from "../../assets/background-stars.svg";

const GideSection = () => {
  return (
    <section>
      <div className="flex justify-center items-centers flex-col">
        <div className="relative w-full md:mb-35 mb-20">
          <img
            src={stars}
            alt="Stars background"
            className="absolute left-1/2 -translate-x-1/2 md:-top-10 -top-3"
            width={1000}
          />
          <div className="flex flex-col items-center relative z-10">
            <h2
              className="text-slider-green md:text-6xl text-4xl max-sm:text-2xl text-center"
              id="gide"
            >
              Как использовать Slider?
            </h2>
          </div>
        </div>
      </div>
      <GideSchema />
    </section>
  );
};

export default GideSection;
