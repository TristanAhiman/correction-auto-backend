import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProfDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/prof/dashboard")
      .then(res => setData(res.data));
  }, []);

  if (!data) return <p>Chargement...</p>;

  return (
    <div className="dashboard">
      <h1>Espace Professeur</h1>

      <div className="stats">
        <div className="card">📄 Copies corrigées : {data.copies_corrigees}</div>
        <div className="card">📚 Classes : {data.classes.length}</div>
      </div>

      <h2>Dernières corrections</h2>
      <ul>
        {data.dernieres_corrections.map((c, i) => (
          <li key={i}>{c.eleve} — {c.note}/20</li>
        ))}
      </ul>

      <button onClick={() => window.location.href="/correction"}>
        ➕ Nouvelle correction
      </button>

      <button onClick={() => window.location.href="/bulletins"}>
        📄 Générer bulletin
      </button>
    </div>
  );
}
