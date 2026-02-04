import React, { useState } from "react";
import { uploadBareme, uploadCopies, preCorrection } from "../services/api";

function Examen() {
  const [bareme, setBareme] = useState(null);
  const [copies, setCopies] = useState([]);
  const [resultat, setResultat] = useState(null);

  const handleBaremeUpload = async () => {
    if (!bareme) return alert("Ajoute le barème");
    await uploadBareme(bareme);
    alert("Barème enregistré");
  };

  const handleCopiesUpload = async () => {
    if (copies.length === 0) return alert("Ajoute des copies");
    await uploadCopies(copies);
    alert("Copies envoyées");
  };

  const handleCorrection = async () => {
    const res = await preCorrection();
    setResultat(res.data);
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>MODE EXAMEN</h2>

      <h3>1. Barème officiel</h3>
      <input type="file" onChange={(e) => setBareme(e.target.files[0])} />
      <button onClick={handleBaremeUpload}>Envoyer barème</button>

      <h3>2. Copies élèves</h3>
      <input
        type="file"
        multiple
        onChange={(e) => setCopies(Array.from(e.target.files))}
      />
      <button onClick={handleCopiesUpload}>Envoyer copies</button>

      <h3>3. Correction IA</h3>
      <button onClick={handleCorrection}>Lancer correction</button>

      {resultat && (
        <div>
          <h4>Note : {resultat.note}/20</h4>
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

export default Examen;
