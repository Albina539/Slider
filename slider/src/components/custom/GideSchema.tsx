import mascot from "../../assets/logo.svg";
import arrow from "../../assets/arrow-right.svg";
import arrowDown from "../../assets/arrow-down.svg";

const GideSchema = () => {
  return (
    <div className="flex flex-col overflow-hidden md:mb-25 mb-15 items-center">
      <div className="relative flex max-md:flex-col justify-center items-center md:mb-12 mb-5 md:right-50">
        <div className="flex flex-col items-start max-md:mb-5">
          <img src={mascot} alt="mascot" className="md:w-24 w-16" />
          <span className="flex items-center justify-center text-black bg-slider-green px-6 py-3 md:text-3xl text-xl md:w-100 w-70 md:h-24 h-18 text-center">
            Войди в аккаунт
          </span>
        </div>
        <img
          src={arrow}
          alt="arrow"
          className="md:block hidden w-32 h-32 object-contain absolute left-1/2 translate-x-55 top-25"
        />
        <img
          src={arrowDown}
          alt="arrow-down"
          className="md:hidden block w-32 h-32"
        />
      </div>

      <div className="relative flex max-md:flex-col justify-center items-center md:mb-12 mb-5 md:left-50">
        <img
          src={arrow}
          alt="arrow"
          className="md:block hidden w-32 h-32 object-contain absolute right-1/2 -translate-x-55 top-25 rotate-270"
        />
        <div className="flex flex-col items-end max-md:mb-5 max-md:-mt-10">
          <img src={mascot} alt="mascot" className="md:w-24 w-16" />
          <span className="flex items-center justify-center text-black bg-slider-green px-6 py-3 md:text-3xl text-xl md:w-100 w-70 md:h-24 h-18 text-center">
            Загрузи свой текст
          </span>
        </div>
        <img
          src={arrowDown}
          alt="arrow-down"
          className="md:hidden block w-32 h-32"
        />
      </div>

      <div className="relative flex max-md:flex-col justify-center items-center md:mb-12 mb-5 md:right-50">
        <div className="flex flex-col items-start max-md:mb-5 max-md:-mt-10">
          <img src={mascot} alt="mascot" className="md:w-24 w-16" />
          <span className="flex items-center justify-center text-black bg-slider-green px-6 py-3 md:text-3xl text-xl md:w-100 w-70 md:h-24 h-18 text-center">
            Выбери параметры презентации
          </span>
        </div>
        <img
          src={arrow}
          alt="arrow"
          className="md:block hidden w-32 h-32 object-contain absolute left-1/2 translate-x-55 top-25"
        />
        <img
          src={arrowDown}
          alt="arrow-down"
          className="md:hidden block w-32 h-32"
        />
      </div>

      <div className="relative flex max-md:flex-col justify-center items-center md:left-50">
        <div className="flex flex-col items-end max-md:-mt-10">
          <img src={mascot} alt="mascot" className="md:w-24 w-16" />
          <span className="flex items-center justify-center text-black bg-slider-green px-6 py-3 md:text-3xl text-xl md:w-100 w-70 md:h-24 h-18 text-center">
            Все готово!
          </span>
        </div>
      </div>
    </div>
  );
};

export default GideSchema;
