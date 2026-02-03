import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const testBackend = () => API.get("/examen/test");
export const uploadCopies = (data) => API.post("/examen/upload", data);
