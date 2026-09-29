import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuVariants } from "@/components/animations/menuAnimations";
import NavLinks from "./NavLinks";
import LanguageSelector from "./LanguageSelector";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 w-full text-white flex justify-between items-center px-4 md:px-8 py-3 shadow-md z-50"
      style={{ backgroundColor: "#097c75" }}
    >
      {/* LOGO */}
      <div className="flex items-center gap-3">
        <img
          src="Images/logo.webp"
          alt="E-Technologie"
          className="h-10 w-auto object-contain filter brightness-0 invert"
        />
      </div>

      {/* Sélecteur de langue centré sur mobile */}
      <div className="absolute left-1/2 transform -translate-x-1/2 md:hidden">
        <LanguageSelector />
      </div>

      {/* Menu desktop */}
      <div className="hidden md:flex items-center space-x-8">
        <NavLinks />
        <LanguageSelector />
      </div>

      {/* Hamburger mobile */}
      <div className="md:hidden flex items-center pr-2">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#097c75]/90 backdrop-blur-sm md:hidden z-40"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div
              className="absolute inset-0"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              className="relative flex flex-col justify-center items-center text-2xl h-full space-y-6 px-6 text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* ✅ Liens centrés */}
              <NavLinks
                vertical
                className="flex flex-col items-center gap-6 text-center"
                onClick={() => setMenuOpen(false)}
              />

              <button
                onClick={() => setMenuOpen(false)}
                className="mt-8 px-6 py-2 bg-white text-[#097c75] rounded-lg shadow hover:bg-gray-100 transition"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
