import React, { useState } from "react";
import api from "../services/api";

export default function BulletinForm() {
  const [eleve, setEleve] = useState("");
  const [classe, setClasse] = useState("");
  const [matieres, setMatieres] = useState([
    { nom: "", note: "", coef: 1 }
  ]);

  const ajouterMatiere = () => {
    setMatieres([...matieres, { nom: "", note: "", coef: 1 }]);
  };

  const modifier = (i, champ, valeur) => {
    const copy = [...matieres];
    copy[i][champ] = valeur;
    setMatieres(copy);
  };

  const generer = async () => {
    const res = await api.post("/bulletin/generer", {
      eleve,
      classe,
      matieres: matieres.map(m => ({
        nom: m.nom,
        note: Number(m.note),
        coef: Number(m.coef)
      }))
    });

    window.open(
      "http://127.0.0.1:5000/" + res.data.pdf,
      "_blank"
    );
  };

  return (
    <div className="card">
      <h2>📘 Génération bulletin</h2>

      <input
        placeholder="Nom élève"
        value={eleve}
        onChange={e => setEleve(e.target.value)}
      />

      <input
        placeholder="Classe"
        value={classe}
        onChange={e => setClasse(e.target.value)}
      />

      {matieres.map((m, i) => (
        <div key={i} className="ligne">
          <input
            placeholder="Matière"
            value={m.nom}
            onChange={e => modifier(i, "nom", e.target.value)}
          />
          <input
            type="number"
            placeholder="Note"
            value={m.note}
            onChange={e => modifier(i, "note", e.target.value)}
          />
          <input
            type="number"
            placeholder="Coef"
            value={m.coef}
            onChange={e => modifier(i, "coef", e.target.value)}
          />
        </div>
      ))}

      <button onClick={ajouterMatiere}>
        ➕ Ajouter matière
      </button>

      <button onClick={generer} className="primary">
        📄 Générer bulletin PDF
      </button>
    </div>
  );
}