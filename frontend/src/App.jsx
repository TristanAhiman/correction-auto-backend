import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CorrectionLibre from "./pages/CorrectionLibre";
import ModeExamen from "./pages/ModeExamen";
import ProfDashboard from "./pages/ProfDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/correction-libre" element={<CorrectionLibre />} />
        <Route path="/mode-examen" element={<ModeExamen />} />
        <Route path="/professeur" element={<ProfDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
