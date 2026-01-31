import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>CORRECTION AUTO</h1>
      <p>Plateforme intelligente d’évaluation et de correction automatisée</p>

      <div className="card">
        <button onClick={() => navigate("/exam")}>
          🎓 Examen de mode
        </button>

        <button onClick={() => navigate("/correction")}>
          ⚡ Correction libre
        </button>

        <button onClick={() => navigate("/login")}>
          👨‍🏫 Espace Professeur
        </button>
      </div>
    </div>
  );
}
