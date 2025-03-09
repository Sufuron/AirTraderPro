import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      navigate("/admin");
    } else {
      setError("Credenciales incorrectas.");
    }
  };

  return (
    <div className="login-page">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
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
