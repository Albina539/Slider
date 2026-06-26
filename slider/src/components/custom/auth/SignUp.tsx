import { useState, type SubmitEventHandler } from "react";
import { Field, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firebaseDb } from "../../../../config/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { Loader } from "pixelarticons/react";

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
    } catch (err) {
      console.error("Ошибка при регистрации: ", err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSignUp}>
      <FieldGroup>
        <Field>
          <FieldLabel>Полное имя</FieldLabel>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Field>
        <Field>
          <FieldLabel>Почта</FieldLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        <Field>
          <FieldLabel>Пароль</FieldLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>
        <Field>
          <FieldLabel>Подтвердите пароль</FieldLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Field>
        {error && <div>{error}</div>}
      </FieldGroup>
      <Button disabled={loading}>
        {loading ? (
          <div>
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
      <p>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </form>
  );
};

export default SignUp;
