import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CorrectionLibre from "./pages/CorrectionLibre";
import Examen from "./pages/Examen";
import Professeur from "./pages/Professeur";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/correction-libre" element={<CorrectionLibre />} />
        <Route path="/examen" element={<Examen />} />
        <Route path="/professeur" element={<Professeur />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

<Route
  path="/professeur"
  element={
    <ProtectedRoute role="prof">
      <Professeur />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <Admin />
    </ProtectedRoute>
  }
/>

export default App;






