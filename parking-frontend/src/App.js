import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // ❌ Usuń BrowserRouter!
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // 🔥 Jeśli token się zmieni, zapisz go w `localStorage`
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <div className="app-container">
      <h1 className="app-title">PARKING FOR YOU !!!</h1>
      <Routes>
        {/* 🔥 Domyślna ścieżka przekierowuje na login */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />

        {/* 🔥 Jeśli token istnieje, przechodzimy na dashboard, inaczej wracamy na login */}
        <Route path="/dashboard" element={token ? <Dashboard token={token} setToken={setToken} /> : <Navigate to="/login" />} />

        {/* 🔥 Każda inna ścieżka przekieruje na login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
