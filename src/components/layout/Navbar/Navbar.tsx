


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

      {/* MENU MOBILE - Drawer latéral */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay discret */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-[#097c75] shadow-lg md:hidden z-50 flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Header du menu */}
              <div className="flex justify-between items-center px-4 py-3 border-b border-white/20">
                <span className="text-lg font-bold">Menu</span>
                <button onClick={() => setMenuOpen(false)}>
                  <X size={28} />
                </button>
              </div>

              {/* Liens */}
              <div className="flex flex-col gap-6 px-6 py-8 text-white text-lg">
                <NavLinks
                  vertical
                  className="flex flex-col gap-4"
                  onClick={() => setMenuOpen(false)}
                />
                <LanguageSelector />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
