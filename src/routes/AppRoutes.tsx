import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/components/pages/Home";
import Compressor from "@/components/pages/compressor";
import About from "@/components/pages/About"; // <-- ajout de la page À propos

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/compressor" element={<Compressor />} />
      <Route path="/about" element={<About />} /> {/* nouvelle route */}
    </Routes>
  );
}
