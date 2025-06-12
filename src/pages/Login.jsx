import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth as firebaseAuth } from "../firebase";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

   try {
      await signInWithEmailAndPassword(
        firebaseAuth,
        credentials.email,
        credentials.password
      );
      navigate("/admin");
       } catch (err) {
      console.error("Login error:", err.code, err.message);
      let message = "Ocurri\u00f3 un error al iniciar sesi\u00f3n.";
      switch (err.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          message = "Correo electr\u00f3nico o contrase\u00f1a incorrectos.";
          break;
        case "auth/invalid-email":
          message = "El formato del correo electr\u00f3nico es inv\u00e1lido.";
          break;
        case "auth/user-disabled":
          message = "Este usuario ha sido deshabilitado.";
          break;
        default:
          message = `Error: ${err.message}`;
      }
      setError(message);
    }
  };
  
  return (
    <div className="login-page">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
