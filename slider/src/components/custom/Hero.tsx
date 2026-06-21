import logo from "../../assets/logo.svg";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div>
      <div className="flex flex-col">
        <img src={logo} alt="logo" width={100} height={100} />
        <h1 className="text-green-400">Slider</h1>
        <p>Play with ideas. Create design</p>
      </div>
      <div>
        <Button>
          <div>
            <span>Начать</span>
          </div>
        </Button>
        <a href="#"></a>
      </div>
    </div>
  );
};

export default Hero;
