import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import confetti from "canvas-confetti";
import { useTranslation } from "react-i18next";
const SuccessToast = ({ visible, onHide, mode = "batch" }) => {
    const [show, setShow] = useState(false);
    const { t } = useTranslation();
    useEffect(() => {
        if (visible) {
            const raf = requestAnimationFrame(() => {
                setShow(true);
                confetti({
                    particleCount: mode === "batch" ? 200 : 100,
                    spread: mode === "batch" ? 120 : 90,
                    origin: { y: 0.6 },
                    startVelocity: 40,
                    colors: mode === "batch"
                        ? ["#ff0000", "#00ff00", "#0000ff", "#ffd700"]
                        : ["#ff7f50", "#ffa500", "#ff4500", "#f0e68c"],
                });
            });
            const timer = setTimeout(() => {
                setShow(false);
                onHide?.();
            }, 3000);
            return () => {
                cancelAnimationFrame(raf);
                clearTimeout(timer);
            };
        }
    }, [visible, onHide, mode]);
    return (_jsx(AnimatePresence, { children: show && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, transition: { duration: 0.5 }, className: "fixed inset-0 flex items-center justify-center z-[9999] px-4", children: _jsxs("div", { className: `
              ${mode === "batch" ? "bg-green-600" : "bg-orange-600"} 
              text-white 
              w-full max-w-sm sm:max-w-md
              px-4 sm:px-6 
              py-3 sm:py-4 
              rounded-xl shadow-lg 
              flex items-center justify-center gap-2 sm:gap-3 
              text-sm sm:text-base md:text-lg
            `, children: [_jsx(CheckCircleIcon, { className: "w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" }), _jsx("span", { className: "font-semibold text-center", children: mode === "batch"
                            ? t("successToast.batch")
                            : t("successToast.single") })] }) })) }));
};
export default SuccessToast;
