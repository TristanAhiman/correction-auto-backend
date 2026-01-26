import React from "react";

function App() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>CORRECTION AUTO</h1>

        <p style={styles.subtitle}>
          Plateforme intelligente d’évaluation et de correction automatisée
        </p>

        <div style={styles.buttons}>
          <button
            style={styles.mainButton}
            onClick={() => alert("Mode Examen activé")}
          >
            🎓 Mode Examen
          </button>

          <button
            style={styles.secondaryButton}
            onClick={() => alert("Correction Libre bientôt disponible")}
          >
            ✍️ Correction Libre
          </button>

          <button
            style={styles.secondaryButton}
            onClick={() => alert("Espace Professeur bientôt disponible")}
          >
            👨‍🏫 Espace Professeur
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "radial-gradient(circle at top, #1f2933 0%, #0f172a 40%, #020617 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  card: {
    width: "90%",
    maxWidth: "420px",
    padding: "40px 30px",
    borderRadius: "24px",
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
    textAlign: "center",
    color: "white",
  },

  title: {
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "1px",
    marginBottom: "12px",
  },

  subtitle: {
    fontSize: "14px",
    opacity: 0.85,
    marginBottom: "30px",
    lineHeight: "1.5",
  },

  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  mainButton: {
    padding: "15px",
    borderRadius: "16px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#020617",
    background: "linear-gradient(90deg, #22d3ee, #38bdf8)",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(56,189,248,0.4)",
    transition: "transform 0.2s ease",
  },

  secondaryButton: {
    padding: "14px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.25)",
    background: "transparent",
    color: "white",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
};

export default App;
