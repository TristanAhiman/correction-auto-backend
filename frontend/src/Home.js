import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.card}>
  <h1 style={styles.title}>CORRECTION AUTO</h1>

  <p style={styles.subtitle}>
    Plateforme intelligente d’évaluation et de correction automatisée
  </p>

  <div style={styles.buttons}>
    <button
      style={styles.mainButton}
      onClick={() => window.location.href = "/examen"}
    >
      🎓 Mode Examen
    </button>

    <button
      style={styles.secondaryButton}
      onClick={() => window.location.href = "/correction"}
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

  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    background: "rgba(255,255,255,0.10)",
    padding: "45px",
    borderRadius: "18px",
    width: "90%",
    maxWidth: "520px",
    textAlign: "center",
    backdropFilter: "blur(12px)",
    boxShadow: "0 25px 50px rgba(0,0,0,0.45)",
  },
  title: {
    fontSize: "34px",
    marginBottom: "12px",
    letterSpacing: "1px",
  },
  subtitle: {
    fontSize: "16px",
    opacity: 0.9,
    marginBottom: "35px",
    lineHeight: "1.6",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  primaryBtn: {
    padding: "15px",
    background: "linear-gradient(90deg, #00e0ff, #00b4d8)",
    color: "#000",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
  },
  secondaryBtn: {
    padding: "15px",
    background: "#ffffff",
    color: "#000",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
  },
  outlineBtn: {
    padding: "14px",
    background: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.5)",
    borderRadius: "12px",
    textDecoration: "none",
    fontSize: "14px",
  },
};

 export default Home;