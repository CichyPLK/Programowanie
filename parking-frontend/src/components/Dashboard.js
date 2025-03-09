import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Usunięcie tokena JWT
    navigate("/login"); // Powrót do logowania
  };

  return (
    <div className="dashboard-container">
      <h1>Witaj na swoim koncie!</h1>
      <p>Jesteś zalogowany 🎉</p>
      <button onClick={handleLogout} className="logout-button">Wyloguj</button>
    </div>
  );
}

export default Dashboard;
