import { useState, type SubmitEventHandler } from "react";
import { Field, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firebaseDb } from "../../../../config/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { Loader, Lock, Mail, User } from "pixelarticons/react";
import stars from "../../../assets/background-stars.svg";
import logo from "../../../assets/logo.svg";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Пароль слишком короткий");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: fullName || email.split("@")[0],
      });

      await setDoc(doc(firebaseDb, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        fullName: fullName || email.split("@")[0],
        createdAt: new Date(),
      });

      navigate("/workspace");
    } catch (err: any) {
      console.error("Ошибка при регистрации: ", err);
      if (err.code === "auth/email-already-in-use") {
        setError("Такой пользователь зарегестрирован");
      } else if (err.code === "auth/invalid-email") {
        setError("Неправильный формат почты");
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
              Давай знакомиться!
            </h1>
            <p className="md:text-2xl text-xl">Я Slider, а ты?</p>
          </div>

          <form onSubmit={handleSignUp} className="flex flex-col gap-6">
            <FieldGroup className="flex flex-col">
              <Field>
                <FieldLabel className="md:text-2xl text-xl">
                  Полное имя
                </FieldLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User />
                  </div>
                  <Input
                    className="bg-white border-2 border-black text-lg! h-12! pl-9 pr-4 py-3"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Slider"
                    required
                  />
                </div>
              </Field>
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
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock />
                  </div>
                  <Input
                    className="bg-white border-2 border-black text-lg! h-12! pl-9 pr-4 py-3"
                    type="password"
                    value={password}
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </Field>
              <Field>
                <FieldLabel className="md:text-2xl text-xl">
                  Подтвердите пароль
                </FieldLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock />
                  </div>
                  <Input
                    className="bg-white border-2 border-black text-lg! h-12! pl-9 pr-4 py-3"
                    type="password"
                    value={confirmPassword}
                    placeholder="••••••••"
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                  <span>Регистрация...</span>
                </div>
              ) : (
                "Зарегистрироваться"
              )}
            </Button>
            <p className="text-center md:text-xl text-lg">
              Уже есть аккаунт?{" "}
              <Link to="/login" className="text-slider-dark">
                Войти
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
