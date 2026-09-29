import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { motion } from "framer-motion";
const useCountUp = (target, duration = 1500, startCounting) => {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        if (!startCounting)
            return;
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const interval = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(interval);
            }
            else {
                setCount(start);
            }
        }, 16);
        return () => clearInterval(interval);
    }, [target, duration, startCounting]);
    return count;
};
const StatCard = ({ value, label, delay = 0 }) => {
    const [visible, setVisible] = React.useState(false);
    const count = useCountUp(value, 1500, visible);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: "easeOut", delay }, viewport: { once: true }, onViewportEnter: () => setVisible(true), className: "group relative p-6 bg-white/30 backdrop-blur-2xl border border-white/40 \r\n                 rounded-2xl shadow-md transition-colors overflow-hidden \r\n                 hover:bg-[#097c75] hover:text-white text-center", children: [_jsxs("p", { className: "text-4xl font-extrabold mb-2", children: [count.toLocaleString(), "+"] }), _jsx("p", { className: "text-sm", children: label })] }));
};
export default StatCard;
