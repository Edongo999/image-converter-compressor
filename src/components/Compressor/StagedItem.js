import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { ArrowDownTrayIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
const StagedItem = ({ staged, onCompress, onCancel, formatSize }) => {
    const isConverting = staged.status === "compressing";
    const { t } = useTranslation();
    const handleCompress = async () => {
        await onCompress(staged.id);
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, transition: { duration: 0.6, ease: "easeOut" }, className: "w-[300px] h-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-md flex flex-col p-6", children: [_jsxs("div", { className: "w-full relative", children: [_jsx("img", { src: staged.previewUrl, alt: staged.name, className: `w-[300px] h-[250px] object-cover rounded-xl shadow-lg mx-auto 
            transition duration-2000 ease-in-out
            ${isConverting ? "filter blur-md opacity-60" : "blur-0 opacity-100"}` }), isConverting && (_jsxs("div", { className: "absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl transition-opacity duration-1500 ease-in-out", children: [_jsx(Loader2, { className: "w-10 h-10 text-white animate-spin mb-3" }), _jsx("div", { className: "w-3/4 bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-green-500 h-2 rounded-full transition-all duration-700 ease-in-out", style: { width: `${staged.progress ?? 0}%` } }) }), _jsxs("p", { className: "text-white text-sm mt-2", children: [Math.round(staged.progress ?? 0), "%"] })] }))] }), _jsx("p", { className: "text-base text-gray-700 font-medium truncate text-center mt-3", children: staged.name }), _jsx("p", { className: "text-sm text-gray-500 text-center", children: formatSize(staged.size) }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mt-4", children: [_jsx(motion.button, { onClick: handleCompress, disabled: isConverting, className: "flex-1 bg-gradient-to-r from-[#097c75] to-orange-500 \r\n                     text-white px-5 py-3 rounded-xl shadow-lg transition \r\n                     text-sm font-semibold flex items-center justify-center gap-2", children: isConverting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-5 h-5 animate-spin" }), t("stagedItem.converting")] })) : (_jsxs(_Fragment, { children: [_jsx(ArrowDownTrayIcon, { className: "w-5 h-5 text-white" }), t("stagedItem.convert")] })) }), _jsxs(motion.button, { onClick: () => onCancel(staged.id), disabled: isConverting, className: "flex-1 border bg-white/70 backdrop-blur-md \r\n                     px-5 py-3 rounded-xl hover:bg-white transition shadow-sm \r\n                     text-sm font-semibold text-gray-700 flex items-center justify-center gap-2", children: [_jsx(XCircleIcon, { className: "w-5 h-5 text-red-500" }), t("stagedItem.cancel")] })] })] }));
};
export default StagedItem;
