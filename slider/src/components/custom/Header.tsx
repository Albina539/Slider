import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="py-4 px-6 flex justify-between items-center bg-[#11002F]">
      {/* Левая часть: логотип + название */}
      <Link to="/">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo slider" width={50} height={50} />
          <span className="text-4xl font-medium text-white">Slider</span>
        </div>
      </Link>

      {/* Правая часть: зелёный квадрат с буквой A */}
      <div 
        className="w-[50px] h-[50px] flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'hsla(124, 100%, 59%, 1)' }}
      >
        <span 
          className="leading-none"
          style={{
            fontFamily: '"Pixel Font7", monospace',
            fontSize: '64px',
            fontWeight: 250,
            color: 'hsl(0, 0%, 0%)',
            lineHeight: 1,
            letterSpacing: 'normal',
          }}
        >
          A
        </span>
      </div>
    </div>
  );
};

export default Header;