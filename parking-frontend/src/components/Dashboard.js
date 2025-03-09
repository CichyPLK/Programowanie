import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState({});
  const [selectedLocation, setSelectedLocation] = useState("");

  // Pobieramy dostępne lokacje z backendu
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/parking-spots")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania lokacji:", error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Usunięcie tokena JWT
    navigate("/login"); // Powrót do logowania
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  return (
    <div className="dashboard-container">
      <h1>Witaj na swoim koncie!</h1>
      <p>Jesteś zalogowany 🎉</p>

      {/* Sekcja wyboru lokalizacji */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="location-select">Wybierz lokalizację:</label>
        <select
          id="location-select"
          value={selectedLocation}
          onChange={handleLocationChange}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          <option value="">-- Wybierz --</option>
          {Object.keys(locations).map((locName) => (
            <option key={locName} value={locName}>
              {locName} (dostępne: {locations[locName].available_spots.length} miejsc)
            </option>
          ))}
        </select>
      </div>

      {/* Wyświetlenie szczegółów wybranej lokalizacji */}
      {selectedLocation && (
        <div>
          <h3>Wybrana lokalizacja: {selectedLocation}</h3>
          <p>
            Pojemność: {locations[selectedLocation].capacity} miejsc, dostępne:{" "}
            {locations[selectedLocation].available_spots.join(", ")}
          </p>
        </div>
      )}

      <button onClick={handleLogout} className="logout-button">
        Wyloguj
      </button>
    </div>
  );
}

export default Dashboard;
