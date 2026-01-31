import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      setMessage("✅ Connexion réussie");
    } catch {
      setMessage("❌ Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="container">
      <h2>Connexion Professeur</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Connexion</button>

      <p>{message}</p>
    </div>
  );
}
