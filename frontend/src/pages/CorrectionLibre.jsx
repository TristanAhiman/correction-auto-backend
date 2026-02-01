import React, { useState } from "react";
import axios from "axios";
import "./CorrectionLibre.css";

export default function CorrectionLibre() {
  const [files, setFiles] = useState([]);
  const [bareme, setBareme] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFiles = (e) => {
    setFiles([...e.target.files]);
  };

  const lancerCorrection = async () => {
    if (files.length === 0) return alert("Ajoute au moins une photo ou un PDF");

    const formData = new FormData();
    files.forEach((f) => formData.append("copies", f));
    formData.append("bareme", bareme);

    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/correction/libre",
        formData
      );
      setResult(res.data);
    } catch (e) {
      alert("Erreur lors de la correction");
    }
    setLoading(false);
  };

  return (
    <div className="page">
      <h1>Correction libre</h1>

      <div className="card">
        <label>📷 Photos / PDF (recto-verso possible)</label>
        <input type="file" multiple accept="image/*,.pdf" onChange={handleFiles} />

        <label>📑 Barème (optionnel)</label>
        <textarea
          placeholder="Ex: Q1=5pts, Q2=10pts..."
          value={bareme}
          onChange={(e) => setBareme(e.target.value)}
        />

        <button onClick={lancerCorrection} disabled={loading}>
          {loading ? "Correction en cours..." : "Lancer la correction"}
        </button>
      </div>

      {result && (
        <div className="result">
          <h2>Résultat</h2>
          <p>📊 Note : <strong>{result.note}/20</strong></p>
          <p>🧠 Appréciation : {result.appreciation}</p>
          <p>📁 Fichiers analysés : {result.fichiers_analyses}</p>
        </div>
      )}
    </div>
  );
}