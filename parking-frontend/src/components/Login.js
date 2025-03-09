import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";

const API_URL = "http://127.0.0.1:5000/login";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const response = await axios.post(API_URL, { email, password });
    localStorage.setItem("token", response.data.token);
    alert("Zalogowano pomyślnie!");
    navigate("/dashboard"); // 🔥 Po zalogowaniu przekierowanie na Dashboard
  } catch (error) {
    alert("Błąd logowania: " + (error.response?.data?.error || "Nieznany błąd"));
  }
};


  return (
    <div className="login-container form-container">
      <div className="login-box form-box">
        <h2 className="form-title">Logowanie</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="form-button">Zaloguj</button>
        <p>
          Nie masz konta? <Link to="/register" className="form-link">Zarejestruj się</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
