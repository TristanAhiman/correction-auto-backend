import axios from "axios";

const API = axios.create({
  baseURL: "https://correction-auto-backend-5.onrender.com",
});

export const uploadBareme = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return API.post("/examen/bareme", formData);
};

export const uploadCopies = (files) => {
  const formData = new FormData();
  files.forEach(f => formData.append("files", f));
  return API.post("/examen/copies", formData);
};

export const preCorrection = () => {
  return API.post("/correction/pre");
};