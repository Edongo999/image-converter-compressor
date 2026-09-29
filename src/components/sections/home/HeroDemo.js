import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
const images = [
    "/Images/landry.webp",
    "/Images/landry1.webp",
    "/Images/landry2.webp",
    "/Images/landry3.webp",
    "/Images/landry4.webp",
];
const HeroDemo = () => {
    const [percent, setPercent] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const percentRef = useRef(0);
    const directionRef = useRef(1);
    const rafRef = useRef(null);
    const lastTimeRef = useRef(null);
    const { t } = useTranslation();
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
            percentRef.current =
                percentRef.current + directionRef.current * speedPerSec * deltaSec;
            if (percentRef.current >= maxPercent) {
                percentRef.current = maxPercent;
                directionRef.current = -1;
            }
            else if (percentRef.current <= 0) {
                percentRef.current = 0;
                directionRef.current = 1;
                // ✅ Quand une boucle est terminée, on passe à l’image suivante
                setFade(false);
                setTimeout(() => {
                    setCurrentIndex((i) => (i + 1) % images.length);
                    setFade(true);
                }, 600);
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
    return (_jsxs("div", { className: "relative bg-white/50 backdrop-blur-2xl border border-white/40 \r\n      p-4 sm:p-6 rounded-2xl shadow-xl \r\n      w-full sm:max-w-[900px] \r\n      h-auto", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-2xl" }), _jsxs("div", { className: "relative z-10", children: [_jsxs("p", { className: "text-sm text-gray-600 mb-3 flex items-center gap-2", children: [_jsx(ImageIcon, { size: 16 }), t("conversionDemo.title")] }), _jsxs("div", { className: "relative w-full h-[300px] sm:h-[300px] rounded-2xl overflow-hidden mb-4", children: [_jsx("img", { src: images[currentIndex], className: `absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${fade ? "opacity-100" : "opacity-0"}`, alt: "original" }), _jsx("div", { className: "absolute inset-y-0 left-0 overflow-hidden", style: {
                                    width: `${percent}%`,
                                    transition: "width 0.12s linear",
                                }, children: _jsx("img", { src: images[currentIndex], className: "h-full w-full object-cover", alt: "compressed" }) }), _jsx("div", { className: "absolute bottom-0 left-0 h-1 bg-[#097c75]", style: {
                                    width: `${percent}%`,
                                    transition: "width 0.12s linear",
                                } })] }), _jsxs("div", { className: "mt-2 text-center text-[#097c75] font-semibold", "aria-live": "polite", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 text-[#097c75] font-semibold", children: [_jsx(Loader2, { className: "animate-spin", size: 18 }), t("conversionDemo.progress", { index: currentIndex + 1, percent })] }), _jsxs("div", { className: "text-sm text-gray-600 mt-1", children: [t("conversionDemo.original"), " :", " ", _jsxs("span", { className: "font-medium text-gray-800", children: [originalSizeKB, " KB"] }), " • ", t("conversionDemo.current"), " :", " ", _jsxs("span", { className: "font-medium text-gray-800", children: [currentSizeKB, " KB"] }), " • ", t("conversionDemo.reduction"), " :", " ", _jsxs("span", { className: "font-medium text-gray-800", children: [savedKB, " KB (", savedPercent, "%)"] })] })] })] })] }));
};
export default HeroDemo;
