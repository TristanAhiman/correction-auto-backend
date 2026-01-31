import React from "react";
import axios from "axios";

export default function Bulletins() {
  const generateBulletin = async () => {
    const res = await axios.post(
      "http://127.0.0.1:5000/bulletin/generate",
      {},
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "bulletin.pdf");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <h1>Bulletins scolaires</h1>
      <button onClick={generateBulletin}>
        📄 Générer bulletin PDF
      </button>
    </div>
  );
}