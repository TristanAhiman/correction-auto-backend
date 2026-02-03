import axios from "axios";

const API = axios.create({
  baseURL: "https://correction-auto.onrender.com"
});

export const uploadBareme = (file) => {
  const form = new FormData();
  form.append("file", file);
  return API.post("/examen/bareme", form);
};

export const uploadCopies = (files) => {
  const form = new FormData();
  files.forEach(f => form.append("files", f));
  return API.post("/examen/copies", form);
};

export const preCorrection = () =>
  API.post("/examen/corriger");
