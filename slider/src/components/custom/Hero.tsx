import { ChevronRight2 } from "pixelarticons/react";
import logo from "../../assets/logo.svg";
import cloud from "../../assets/cloud-bg.svg";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import stars from "../../assets/background-stars.svg";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../config/FirebaseConfig";

const Hero = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Ошибка при входе: ", error);
    }
  };

  if (loading) {
    return (
      <div className="h-full min-h-screen w-full bg-black flex items-center justify-center">
        <p className="text-white">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen w-full bg-black">
      <div className="relative w-full md:mb-15 mb-10">
        <img
          src={stars}
          alt="Stars background"
          className="absolute left-1/2 -translate-x-1/2 top-20"
          width={800}
        />
        <div className="flex flex-col items-center pt-25">
          <img src={logo} alt="logo" className="md:w-25 w-15" />
          <h1 className="text-6xl font-medium text-slider-green">Slider</h1>
          <p className="text-white text-4xl font-var2">
            Play with ideas. Create design
          </p>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flex flex-col text-white justify-center md:gap-3 gap-1 items-center md:mb-30 mb-23">
          {!user ? (
            <Link to="/login">
              <Button
                className="flex md:gap-4 gap-2 md:text-4xl text-2xl items-center group justify-start md:w-70 w-55"
                variant="ghost"
              >
                <ChevronRight2
                  className="text-black group-hover:text-white"
                  style={{ width: "48px", height: "48px" }}
                />
                <span>Начать</span>
              </Button>
            </Link>
          ) : (
            <Link to="/workspace" className="w-fit">
              <Button
                className="flex md:gap-4 gap-2 md:text-4xl text-2xl items-center group justify-start md:w-70 w-55"
                variant="ghost"
              >
                <ChevronRight2
                  className="text-transparent group-hover:text-white"
                  style={{ width: "48px", height: "48px" }}
                />
                <span>Продолжить</span>
              </Button>
            </Link>
          )}

          <a
            href="#gide"
            className="flex md:gap-4 gap-2 md:text-4xl text-2xl items-center group justify-start md:w-70 w-55 px-2.5"
          >
            <ChevronRight2
              className="text-transparent group-hover:text-white"
              style={{ width: "48px", height: "48px" }}
            />
            <span>Гайд</span>
          </a>
          {user && (
            <Button
              onClick={handleLogout}
              className="flex md:gap-4 gap-2 md:text-4xl text-2xl items-center group justify-start md:w-70 w-55"
              variant="ghost"
            >
              <ChevronRight2
                className="text-black group-hover:text-white"
                style={{ width: "48px", height: "48px" }}
              />
              <span>Выйти</span>
            </Button>
          )}
        </div>
      </div>

      <div className="relative w-full md:-mt-5 -mt-20">
        <div className="absolute inset-0 w-full">
          <img
            src={cloud}
            alt="Cloud background"
            className="w-full h-full object-cover overflow-visible"
          />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-100">
          <h2 className="text-black md:text-6xl text-4xl text-center">
            Генератор презентаций
          </h2>
        </div>
      </div>
      <div className="md:my-60 my-40 max-sm:my-20 flex items-center justify-center md:px-45 px-12 py-4">
        <p className="text-white font-var2 md:text-5xl text-3xl text-center">
          Это интеллектуальный помощник, который превращает хаотичный текст и
          разрозненные данные в стройную, визуально чистую и убедительную
          презентацию на русском языке. Мы даем пользователю не "красивую
          картинку", а готовую структуру выступления.
        </p>
      </div>
    </div>
  );
};

export default Hero;
