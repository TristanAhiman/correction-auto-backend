import axios from "axios";

const API_URL = "https://correction-auto-backend-5.onrender.com";

export const corrigerExamen = async (texte) => {
  return axios.post(`${API_URL}/ia/corriger`, {
    texte: texte,
    bareme: ""
  });
};