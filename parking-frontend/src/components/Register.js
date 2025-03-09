import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // <-- DODAJ Link
import "./index.css";

const API_URL = "http://127.0.0.1:5000/register";

function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    car_plate: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      alert("Rejestracja zakończona sukcesem. Możesz się teraz zalogować.");
      // Usunięto navigate("/login"), aby nie przenosić automatycznie
    } catch (error) {
      alert("Błąd rejestracji: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="register-container form-container">
      <div className="register-box form-box">
        <h2 className="form-title">Rejestracja</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="Imię"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Nazwisko"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="car_plate"
            placeholder="Numer rejestracyjny"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Hasło"
            onChange={handleChange}
            required
          />
          <button type="submit" className="form-button">
            Zarejestruj się
          </button>
        </form>

        {/* Link do logowania za pomocą <Link> */}
        <p style={{ marginTop: "15px" }}>
          Masz już konto? <Link to="/login">Zaloguj się</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
