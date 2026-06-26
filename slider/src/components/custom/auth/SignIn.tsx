import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, type SubmitEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../../config/FirebaseConfig";
import { Field, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Loader } from "pixelarticons/react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/workspace");
    } catch (err) {
      console.error("Ошибка при регистрации: ", err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSignIn}>
      <FieldGroup>
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
        {error && <div>{error}</div>}
      </FieldGroup>
      <Button disabled={loading}>
        {loading ? (
          <div>
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
      <p>
        Нет аккаунта? <Link to="/register">Зарегистрируйся</Link>
      </p>
    </form>
  );
};

export default SignIn;
