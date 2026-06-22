import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header 
      className="flex items-center justify-between w-full h-[131px] px-[70px] py-[10px]"
      style={{ backgroundColor: 'hsl(262, 98%, 9%)' }}
    >
      {/* ⭐ ЛЕВАЯ ЧАСТЬ: картинка + надпись "Slider" */}
      <div 
        className="flex items-center gap-[13px]"
        style={{
          width: '265.4px',
          height: '64px',
        }}
      >
        {/* Картинка Frame 13.svg */}
        <img 
          src="/src/assets/Frame 13.svg" 
          alt="Frame 13"
          className="flex-shrink-0"
          style={{
            width: '92.4px',
            height: '55px',
          }}
        />

        {/* Надпись "Slider" */}
        <div 
          className="flex items-center justify-center"
          style={{
            width: '160px',
            height: '64px',
          }}
        >
          <span 
            className="leading-none"
            style={{
              fontFamily: '"Pixel Font7", monospace',
              fontSize: '42px',
              fontWeight: 250,
              color: 'hsla(0, 0%, 100%, 1)',
              lineHeight: 1,
              letterSpacing: 'normal',
            }}
          >
            Slider
          </span>
        </div>
      </div>

      {/*ПРАВАЯ ЧАСТЬ: квадратный элемент с буквой A */}
      <div 
        className="w-[72px] h-[72px] flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'hsla(124, 100%, 59%, 1)' }}
      >
        <span 
          className="leading-none"
          style={{
            fontFamily: '"Pixel Font7", monospace',
            fontSize: '42px',
            fontWeight: 250,
            color: 'hsl(0, 0%, 0%)',
            lineHeight: 1,
            letterSpacing: 'normal',
          }}
        >
          A
        </span>
      </div>
    </header>
  );
};