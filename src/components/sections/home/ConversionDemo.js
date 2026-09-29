import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Loader2 } from "lucide-react";
const HeroDemo = () => {
    const [percent, setPercent] = useState(0);
    const percentRef = useRef(0);
    const directionRef = useRef(1);
    const rafRef = useRef(null);
    const lastTimeRef = useRef(null);
    const originalSizeKB = 1200;
    const currentSizeKB = Math.round(originalSizeKB * (1 - percent / 100));
    const savedKB = originalSizeKB - currentSizeKB;
    const savedPercent = Math.round((savedKB / originalSizeKB) * 100);
    useEffect(() => {
        const maxPercent = 70;
        const secondsToMax = 3;
        const speedPerSec = maxPercent / secondsToMax;
        const step = (timestamp) => {
            if (lastTimeRef.current == null)
                lastTimeRef.current = timestamp;
            const deltaMs = timestamp - lastTimeRef.current;
            lastTimeRef.current = timestamp;
            const deltaSec = deltaMs / 1000;
            percentRef.current = percentRef.current + directionRef.current * speedPerSec * deltaSec;
            if (percentRef.current >= maxPercent) {
                percentRef.current = maxPercent;
                directionRef.current = -1;
            }
            else if (percentRef.current <= 0) {
                percentRef.current = 0;
                directionRef.current = 1;
            }
            setPercent(Math.round(percentRef.current));
            rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
        return () => {
            if (rafRef.current)
                cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            lastTimeRef.current = null;
        };
    }, []);
    return (_jsxs("div", { className: "relative bg-white/50 backdrop-blur-2xl border border-white/40 p-6 rounded-2xl shadow-xl", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-2xl" }), _jsxs("div", { className: "relative z-10", children: [_jsxs("p", { className: "text-sm text-gray-600 mb-3 flex items-center gap-2", children: [_jsx(ImageIcon, { size: 16 }), "D\u00E9mo conversion en direct"] }), _jsxs("div", { className: "relative aspect-video w-full rounded-2xl overflow-hidden mb-4", children: [_jsx("img", { src: "/Images/landry.webp", className: "absolute inset-0 h-full w-full object-cover", alt: "original" }), _jsx("div", { className: "absolute inset-y-0 left-0 overflow-hidden", style: {
                                    width: `${percent}%`,
                                    transition: "width 0.12s linear"
                                }, children: _jsx("img", { src: "/Images/landry.webp", className: "h-full w-full object-cover", alt: "compressed" }) }), _jsx("div", { className: "absolute bottom-0 left-0 h-1 bg-[#097c75]", style: {
                                    width: `${percent}%`,
                                    transition: "width 0.12s linear"
                                } }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl pointer-events-none" })] }), _jsxs("div", { className: "mt-2 text-center text-[#097c75] font-semibold", "aria-live": "polite", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 text-[#097c75] font-semibold", children: [_jsx(Loader2, { className: "animate-spin", size: 18 }), "Conversion en cours\u2026 ", percent, "%"] }), _jsxs("div", { className: "text-sm text-gray-600 mt-1", children: ["Taille originale : ", _jsxs("span", { className: "font-medium text-gray-800", children: [originalSizeKB, " KB"] }), "  •  ", "Actuelle : ", _jsxs("span", { className: "font-medium text-gray-800", children: [currentSizeKB, " KB"] }), "  •  ", "R\u00E9duction : ", _jsxs("span", { className: "font-medium text-gray-800", children: [savedKB, " KB (", savedPercent, "%)"] })] })] })] })] }));
};
export default HeroDemo;
