import React, { useState } from "react";
import axios from "axios";
import "../App.css";

export default function ModeExamen() {
  const [texteExamen, setTexteExamen] = useState("");
  const [bareme, setBareme] = useState([
    { question: "", points: "", coefficient: 1 },
  ]);
  const [files, setFiles] = useState([]);
  const [resultat, setResultat] = useState(null);
  const [loading, setLoading] = useState(false);

  const ajouterQuestion = () => {
    setBareme([...bareme, { question: "", points: "", coefficient: 1 }]);
  };

  const modifierBareme = (index, champ, valeur) => {
    const copie = [...bareme];
    copie[index][champ] = valeur;
    setBareme(copie);
  };

  const envoyerCorrection = async () => {
    if (!files.length) {
      alert("Ajoute au moins une copie");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("texte_examen", texteExamen);
    formData.append("bareme", JSON.stringify(bareme));

    for (let i = 0; i < files.length; i++) {
      formData.append("copies", files[i]);
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/examen/corriger",
        formData
      );
      setResultat(res.data);
    } catch (e) {
      alert("Erreur de correction");
    }

    setLoading(false);
  };

  return (
    <div className="container">

      <h1>🎓 MODE EXAMEN</h1>
      <p>Correction officielle automatisée</p>

      <div className="card">

        <h3>📝 Texte de l’examen</h3>
        <textarea
          rows="6"
          placeholder="Colle ici le sujet officiel..."
          value={texteExamen}
          onChange={(e) => setTexteExamen(e.target.value)}
        />

        <h3>📊 Barème officiel</h3>

        {bareme.map((q, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <input
              placeholder={`Question ${i + 1}`}
              value={q.question}
              onChange={(e) =>
                modifierBareme(i, "question", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Points"
              value={q.points}
              onChange={(e) =>
                modifierBareme(i, "points", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Coeff"
              value={q.coefficient}
              onChange={(e) =>
                modifierBareme(i, "coefficient", e.target.value)
              }
            />
          </div>
        ))}

        <button onClick={ajouterQuestion}>
          ➕ Ajouter une question
        </button>

        <h3>📷 Copies élèves (PDF / images)</h3>

        <input
          type="file"
          multiple
          accept="image/*,.pdf"
          onChange={(e) => setFiles(e.target.files)}
        />

        <br /><br />

        <button onClick={envoyerCorrection}>
          🚀 Lancer la correction IA
        </button>

        {loading && <p>⏳ Analyse en cours...</p>}

        {resultat && (
          <div style={{ marginTop: "20px" }}>
            <h3>✅ Résultat</h3>
            <p>Note finale : <b>{resultat.note}/20</b></p>
            <p>Appréciation : {resultat.appreciation}</p>
          </div>
        )}

      </div>
    </div>
  );
}

