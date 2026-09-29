import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
const TestimonialCard = ({ text, name, role, delay = 0 }) => (_jsxs(motion.div, { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, whileHover: { scale: 1.05, rotate: 1 }, whileTap: { scale: 0.98 }, transition: {
        type: "spring",
        stiffness: 250,
        damping: 15,
        duration: 0.6,
        ease: "easeOut",
        delay,
    }, className: "group relative p-6 bg-white/30 backdrop-blur-2xl border border-white/40 \r\n               rounded-2xl shadow-md overflow-hidden hover:bg-[#097c75] \r\n               transform-gpu will-change-transform text-center", style: { backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased" }, children: [_jsx(motion.div, { initial: { scale: 0.9 }, animate: { scale: [0.9, 1.1, 0.9] }, transition: { duration: 3, repeat: Infinity }, className: "absolute top-6 left-6 w-12 h-12 bg-[#097c75]/20 blur-xl rounded-full" }), _jsxs("div", { className: "relative z-10 text-gray-700 group-hover:text-white", children: [_jsxs("p", { className: "italic mb-4", children: ["\u201C", text, "\u201D"] }), _jsx("p", { className: "text-sm font-semibold", children: name }), _jsx("p", { className: "text-xs", children: role })] })] }));
export default TestimonialCard;
