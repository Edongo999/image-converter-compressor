import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from "framer-motion";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
const ErrorToast = ({ visible, message }) => {
    const { t } = useTranslation();
    return (_jsx(AnimatePresence, { children: visible && (_jsx(motion.div, { initial: { opacity: 0, y: -20, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -20, scale: 0.95 }, transition: { duration: 0.4, ease: "easeOut" }, className: "fixed inset-0 flex items-center justify-center z-[9999] px-4", children: _jsxs("div", { className: "\r\n              bg-gradient-to-r from-red-500 to-red-400 text-white \r\n              w-[85%] sm:w-auto max-w-sm sm:max-w-md md:max-w-lg\r\n              px-3 sm:px-6 md:px-8 \r\n              py-2 sm:py-4 \r\n              rounded-2xl shadow-lg shadow-red-200 \r\n              flex flex-col items-center gap-2 \r\n              text-sm sm:text-base md:text-lg\r\n              text-center\r\n              break-words whitespace-pre-line\r\n              backdrop-blur-sm\r\n            ", children: [_jsx("div", { className: "bg-white/20 rounded-full p-2 mb-2", children: _jsx(ExclamationTriangleIcon, { className: "w-7 h-7 text-white" }) }), _jsx("span", { className: "font-semibold", children: message || t("errorToast.defaultMessage") })] }) })) }));
};
export default ErrorToast;
