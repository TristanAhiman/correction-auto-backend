import React, { useState } from "react";
import { corrigerExamen } from "../services/api";

function ModeExamen() {
  const [texte, setTexte] = useState("");
  const [resultat, setResultat] = useState(null);
  const [loading, setLoading] = useState(false);

  const lancerCorrection = async () => {
    setLoading(true);
    try {
      const res = await corrigerExamen(texte);
      setResultat(res.data.resultat);
    } catch (err) {
      alert("Erreur lors de la correction");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>MODE EXAMEN</h2>

      <textarea
        placeholder="Collez ici la copie de l'élève..."
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        rows={8}
        style={{ width: "100%" }}
      />

      <button onClick={lancerCorrection} disabled={loading}>
        {loading ? "Correction en cours..." : "Lancer la correction IA"}
      </button>

      {resultat && (
        <div style={{ marginTop: 20 }}>
          <h3>Note : {resultat.note}/20</h3>
          <ul>
            {resultat.commentaires.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ModeExamen;
