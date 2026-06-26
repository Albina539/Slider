import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, type SubmitEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../../config/FirebaseConfig";
import { Field, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Eye, EyeOff, Loader, Mail } from "pixelarticons/react";
import logo from "../../../assets/logo.svg";
import stars from "../../../assets/background-stars.svg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState("password");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    setInputType(!showPassword ? "text" : "password");
  };

  const handleSignIn: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/workspace");
    } catch (err: any) {
      console.error("Ошибка при входе: ", err);
      if (err.code === "auth/invalid-credential") {
        setError("Неверная почта или пароль");
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center p-8
        bg-black"
    >
      <img src={stars} alt="stars" className="absolute px-10" />
      <div className="flex flex-col items-center justify-center w-full relative z-10">
        <img src={logo} alt="slider" className="lg:w-30 md:w-25 w-18" />
        <div className="md:p-10 p-7 text-black bg-slider-green w-full max-w-md flex flex-col">
          <div className="flex flex-col items-center md:mb-12 mb-10">
            <h1 className="lg:text-4xl md:text-3xl text-2xl">
              С возвращением!
            </h1>
            <p className="md:text-2xl text-xl">Slider ждал тебя</p>
          </div>

          <form onSubmit={handleSignIn} className="flex flex-col gap-6">
            <FieldGroup className="flex flex-col">
              <Field>
                <FieldLabel className="md:text-2xl text-xl">Почта</FieldLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail />
                  </div>
                  <Input
                    className="bg-white border-2 border-black text-lg! h-12! pl-9 pr-4 py-3"
                    type="email"
                    value={email}
                    placeholder="winer@slider.ru"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </Field>
              <Field>
                <FieldLabel className="md:text-2xl text-xl">Пароль</FieldLabel>
                <div className="relative">
                  <Button
                    onClick={handleTogglePassword}
                    type="button"
                    className="absolute inset-y-0 right-0 pt-3 pr-3 flex items-center cursor-pointer bg-transparent text-black hover:scale-100"
                    size={"icon-lg"}
                  >
                    {showPassword ? (
                      <Eye style={{ width: "24px", height: "24px" }} />
                    ) : (
                      <EyeOff style={{ width: "24px", height: "24px" }} />
                    )}
                  </Button>
                  <Input
                    className="bg-white border-2 border-black text-lg! h-12! pr-10 pl-4 py-3"
                    type={inputType}
                    value={password}
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </Field>
              {error && <div>{error}</div>}
            </FieldGroup>
            <Button disabled={loading} className="text-xl h-12 cursor-pointer">
              {loading ? (
                <div className="flex gap-2">
                  <Loader
                    className="animate-spin"
                    style={{ width: "32px", height: "32px" }}
                  />
                  <span>Вход...</span>
                </div>
              ) : (
                "Войти"
              )}
            </Button>
            <p className="text-center md:text-xl text-lg">
              Нет аккаунта?{" "}
              <Link to="/register" className="text-slider-dark">
                Зарегистрируйся
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
