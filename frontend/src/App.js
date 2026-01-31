import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ModeExamen from "./pages/ModeExamen";
import CorrectionLibre from "./pages/CorrectionLibre";
import ProfDashboard from "./pages/ProfDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/examen" element={<ModeExamen />} />
        <Route path="/correction-libre" element={<CorrectionLibre />} />

        <Route path="/professeur" element={<ProfDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}