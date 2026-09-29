

import React from "react";
import { NavLink } from "react-router-dom"; // ✅ utiliser NavLink
import { motion } from "framer-motion";
import { itemVariants } from "@/components/animations/menuAnimations";
import { useTranslation } from "react-i18next";
import { FaHome, FaCompressArrowsAlt, FaInfoCircle } from "react-icons/fa";

const navLinks = [
  { key: "home", label: "nav.home", path: "/", icon: <FaHome className="text-lg" /> },
  { key: "compressor", label: "nav.compressor", path: "/compressor", icon: <FaCompressArrowsAlt className="text-lg" /> },
  { key: "about", label: "nav.about", path: "/about", icon: <FaInfoCircle className="text-lg" /> },
];

type NavLinksProps = {
  vertical?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function NavLinks({ vertical = false, onClick }: NavLinksProps) {
  const { t } = useTranslation();

  return (
    <ul
      className={`flex ${
        vertical ? "flex-col space-y-6 w-full text-center" : "space-x-8 items-center"
      } font-medium text-lg`}
    >
      {navLinks.map((link) => (
        <motion.li key={link.key} variants={itemVariants}>
          <NavLink
            to={link.path}
            onClick={onClick}
            className={({ isActive }) =>
              `relative flex items-center gap-2 cursor-pointer px-2 py-1 transition 
              ${isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-300"}`
            }
          >
            {link.icon}
            {t(link.label)}
          </NavLink>
        </motion.li>
      ))}
    </ul>
  );
}
