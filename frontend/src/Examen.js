import { useState } from "react";

function Examen() {
  const [reponse, setReponse] = useState("");
  const [envoye, setEnvoye] = useState(false);

  const handleSubmit = () => {
    if (reponse.trim() === "") {
      alert("Veuillez rédiger votre réponse avant de soumettre.");
      return;
    }
    setEnvoye(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎓 Mode Examen</h2>

        <p style={styles.consigne}>
          Sujet : <br />
          <strong>
            Expliquez l’impact de la technologie sur l’éducation moderne.
          </strong>
        </p>

        {!envoye ? (
          <>
            <textarea
              style={styles.textarea}
              placeholder="Rédigez votre réponse ici..."
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
            />

            <button style={styles.button} onClick={handleSubmit}>
              Soumettre la copie
            </button>
          </>
        ) : (
          <div style={styles.success}>
            ✅ Copie soumise avec succès <br />
            ⏳ Correction en cours…
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "40px",
    borderRadius: "18px",
    width: "90%",
    maxWidth: "650px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
  },
  title: {
    marginBottom: "20px",
  },
  consigne: {
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  textarea: {
    width: "100%",
    height: "180px",
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    fontSize: "15px",
    resize: "none",
    marginBottom: "20px",
  },
  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    background: "linear-gradient(90deg, #00e0ff, #00b4d8)",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
  success: {
    textAlign: "center",
    fontSize: "16px",
    lineHeight: "1.6",
  },
};

export default Examen;
