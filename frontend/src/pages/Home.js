import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>CORRECTION AUTO</h1>
      <p>
        Plateforme intelligente d’évaluation et de correction automatisée
      </p>

      <button onClick={() => navigate("/examen")}>
        🎓 Mode Examen
      </button>

      <button onClick={() => navigate("/correction-libre")}>
        ✍️ Correction libre
      </button>

      <button onClick={() => navigate("/professeur")}>
        👨‍🏫 Espace Professeur
      </button>
    </div>
  );
}