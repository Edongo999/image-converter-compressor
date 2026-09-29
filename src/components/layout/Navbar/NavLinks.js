import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom"; // ✅ utiliser NavLink
import { motion } from "framer-motion";
import { itemVariants } from "@/components/animations/menuAnimations";
import { useTranslation } from "react-i18next";
import { FaHome, FaCompressArrowsAlt, FaInfoCircle } from "react-icons/fa";
const navLinks = [
    { key: "home", label: "nav.home", path: "/", icon: _jsx(FaHome, { className: "text-lg" }) },
    { key: "compressor", label: "nav.compressor", path: "/compressor", icon: _jsx(FaCompressArrowsAlt, { className: "text-lg" }) },
    { key: "about", label: "nav.about", path: "/about", icon: _jsx(FaInfoCircle, { className: "text-lg" }) },
];
export default function NavLinks({ vertical = false, onClick }) {
    const { t } = useTranslation();
    return (_jsx("ul", { className: `flex ${vertical ? "flex-col space-y-6 w-full text-center" : "space-x-8 items-center"} font-medium text-lg`, children: navLinks.map((link) => (_jsx(motion.li, { variants: itemVariants, children: _jsxs(NavLink, { to: link.path, onClick: onClick, className: ({ isActive }) => `relative flex items-center gap-2 cursor-pointer px-2 py-1 transition 
              ${isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-300"}`, children: [link.icon, t(link.label)] }) }, link.key))) }));
}
