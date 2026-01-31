import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CorrectionLibre.css";

export default function CorrectionLibre() {
  const [texte, setTexte] = useState("");
  const [fichiers, setFichiers] = useState([]);
  const [resultat, setResultat] = useState("");
  const [loading, setLoading] = useState(false);

  // MODE EXAMEN
  const [modeExamen, setModeExamen] = useState(false);
  const [temps, setTemps] = useState(3600); // 60 minutes
  const [examenLance, setExamenLance] = useState(false);

  // TIMER
  useEffect(() => {
    if (!examenLance) return;

    if (temps <= 0) {
      lancerCorrection();
      return;
    }

    const timer = setInterval(() => {
      setTemps((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [examenLance, temps]);

  const lancerCorrection = async () => {
    if (loading) return;

    const formData = new FormData();
    formData.append("texte", texte);

    for (let i = 0; i < fichiers.length; i++) {
      formData.append("fichiers", fichiers[i]);
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/corriger",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResultat(response.data.correction);
    } catch (err) {
      setResultat("Erreur lors de la correction.");
    } finally {
      setLoading(false);
      setExamenLance(false);
    }
  };

  const formatTemps = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="correction-container examen">
      <h1>🎓 MODE EXAMEN</h1>

      {!examenLance && (
        <label className="switch">
          <input
            type="checkbox"
            checked={modeExamen}
            onChange={() => setModeExamen(!modeExamen)}
          />
          <span>Activer le mode examen</span>
        </label>
      )}

      {modeExamen && examenLance && (
        <div className="timer">⏱️ Temps restant : {formatTemps(temps)}</div>
      )}

      <textarea
        placeholder="Texte de l'examen"
        value={texte}
        disabled={examenLance}
        onChange={(e) => setTexte(e.target.value)}
      />

      <input
        type="file"
        multiple
        accept="image/*,.pdf"
        disabled={examenLance}
        onChange={(e) => setFichiers([...e.target.files])}
      />

      {!examenLance ? (
        <button
          onClick={() => {
            if (modeExamen) {
              setExamenLance(true);
            } else {
              lancerCorrection();
            }
          }}
        >
          {modeExamen ? "Démarrer l'examen" : "Lancer la correction"}
        </button>
      ) : (
        <button className="submit" onClick={lancerCorrection}>
          Soumettre l'examen
        </button>
      )}

      {resultat && (
        <div className="resultat">
          <h3>📊 Résultat</h3>
          <p>{resultat}</p>
        </div>
      )}
    </div>
  );
}
