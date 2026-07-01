import PitchActions from "./PitchActions";
import stars from "../../assets/background-stars.svg";
import logo from "../../assets/logo.svg";
import { Textarea } from "../ui/textarea";

interface PitchContentProps {
  speech: string;
  loading: boolean;
}

const PitchContent = ({ speech, loading }: PitchContentProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slider-green border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-xl">Генерация текста выступления...</p>
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
          <img src={logo} alt="logo" className="md:w-25 w-15" />
          <h1 className="text-slider-green md:text-6xl text-4xl max-sm:text-2xl text-center">
            BONUS LEVEL
          </h1>
          <p className="text-center leading-none md:text-5xl text-3xl max-sm:text-2xl font-var2 text-white">
            Подготовка к выступлению
          </p>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <Textarea
          className="w-full min-h-96 bg-white p-6 md:p-8 text-black text-base md:text-lg leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-slider-green"
          placeholder="Текст для вашего выступления..."
          value={speech}
          readOnly
        />
      </div>

      <PitchActions />
    </div>
  );
};

export default PitchContent;
