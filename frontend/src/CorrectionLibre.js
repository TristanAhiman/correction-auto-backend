import React, { useState } from "react";
import axios from "axios";

export default function CorrectionLibre() {
  const [files, setFiles] = useState([]);

  const corriger = async () => {
    const formData = new FormData();

    for (let f of files) {
      formData.append("files", f);
    }

    await axios.post("http://127.0.0.1:5000/correction-libre", formData);
    alert("Correction terminée");
  };

  return (
    <div className="container">
      <h2>✍️ CORRECTION LIBRE</h2>

      <input
        type="file"
        multiple
        accept="image/*,.pdf"
        onChange={(e) => setFiles(e.target.files)}
      />

      <button onClick={corriger}>
        Corriger automatiquement
      </button>
    </div>
  );
}
