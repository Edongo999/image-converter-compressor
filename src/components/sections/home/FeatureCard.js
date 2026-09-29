import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
const FeatureCard = ({ icon: Icon, title, desc, delay = 0 }) => {
    const { t } = useTranslation();
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { type: "spring", stiffness: 200, duration: 0.8, ease: "easeOut", delay }, whileHover: { scale: 1.05, rotate: 1 }, className: "group relative p-6 bg-white/30 backdrop-blur-2xl border border-white/40 \r\n                 rounded-2xl shadow-md overflow-hidden hover:bg-[#097c75] hover:text-white \r\n                 min-h-[180px] flex flex-col justify-between", children: [_jsx(motion.div, { initial: { scale: 0.9 }, animate: { scale: [0.9, 1.1, 0.9] }, transition: { duration: 3, repeat: Infinity }, className: "absolute top-4 left-4 w-12 h-12 bg-[#097c75]/20 blur-xl rounded-full" }), _jsxs("div", { className: "relative z-10 flex-1 flex flex-col justify-center", children: [_jsx(Icon, { className: "text-[#097c75] group-hover:text-white mb-3", size: 28 }), _jsx("h3", { className: "text-lg font-bold mb-2", children: t(title) }), _jsx("p", { className: "text-sm", children: t(desc) })] })] }));
};
export default FeatureCard;
