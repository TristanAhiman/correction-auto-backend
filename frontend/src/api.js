import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const uploadBareme = (file) => {
  const formData = new FormData();
  formData.append("bareme", file);

  return API.post("/upload-bareme", formData);
};

export const uploadCopies = (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("copies", file);
  });

  return API.post("/upload-copies", formData);
};

export const preCorrection = () => {
  return API.post("/pre-correction");
};
