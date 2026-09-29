import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Trash2, Loader2 } from "lucide-react";
import ConfirmModal from "./ConfirmModal";
import PdfPreview from "./PdfPreview";
import { useTranslation } from "react-i18next";
const ResultItem = ({ res, index, outputFormat, formatSize, calcReduction, onDelete }) => {
    const [downloading, setDownloading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { t } = useTranslation();
    const handleDownload = () => {
        setDownloading(true);
        setTimeout(() => {
            const link = document.createElement("a");
            link.href = res.compressed;
            link.download = `compressed-${index}.${outputFormat === "original" ? "jpg" : outputFormat}`;
            link.click();
            setDownloading(false);
        }, 1200);
    };
    const handleDelete = () => {
        setShowConfirm(true);
    };
    const confirmDelete = () => {
        onDelete?.(index);
        setShowConfirm(false);
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9, y: 20 }, transition: { duration: 0.8, ease: "easeInOut" }, className: "w-[300px] h-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-md flex flex-col p-6", children: [_jsxs("div", { className: "w-full aspect-square relative", children: [outputFormat === "pdf" ? (_jsx(PdfPreview, { url: res.compressed ?? res.original })) : (_jsx("img", { src: res.compressed ?? res.original, alt: `converted-${index}`, className: `w-[300px] h-[250px] object-cover rounded-xl shadow-lg mx-auto 
              transition duration-2000 ease-in-out
              ${res.progress < 100 ? "blur-md opacity-60" : "blur-0 opacity-100"}` })), res.progress !== undefined && res.progress < 100 && (_jsxs("div", { className: "absolute inset-0 bg-black/40 flex flex-col items-center justify-center rounded-xl transition-opacity duration-1500 ease-in-out", children: [_jsx(Loader2, { className: "w-10 h-10 text-white animate-spin mb-3" }), _jsx("div", { className: "w-3/4 bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-green-500 h-2 rounded-full transition-all duration-700 ease-in-out", style: { width: `${res.progress}%` } }) }), _jsxs("p", { className: "text-white text-sm mt-2", children: [Math.round(res.progress), "%"] })] }))] }), _jsx("p", { className: "text-base text-gray-700 font-medium truncate text-center mt-3", children: `converted-${index}.${outputFormat === "original" ? "jpg" : outputFormat}` }), _jsxs("p", { className: "text-sm text-gray-500 text-center", children: [t("resultItem.original"), " : ", res.originalSize ? formatSize(res.originalSize) : "N/A"] }), res.compressed && res.progress === 100 && (_jsxs(_Fragment, { children: [_jsxs("p", { className: "text-sm text-gray-500 text-center", children: [t("resultItem.optimized"), " : ", res.compressedSize ? formatSize(res.compressedSize) : "N/A"] }), _jsx("p", { className: `font-semibold text-center ${res.originalSize && res.compressedSize && res.compressedSize < res.originalSize
                            ? "text-green-600"
                            : "text-red-600"}`, children: res.originalSize && res.compressedSize
                            ? res.compressedSize < res.originalSize
                                ? `${t("resultItem.reduction")} : ${calcReduction(res.originalSize, res.compressedSize)}`
                                : `${t("resultItem.increase")} : +${(((res.compressedSize - res.originalSize) / res.originalSize) *
                                    100).toFixed(1)}%`
                            : "N/A" })] })), res.compressed && res.progress === 100 && (_jsxs("div", { className: "flex flex-col sm:flex-row justify-center items-center gap-4 mt-4 w-full max-w-[300px] mx-auto", children: [_jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: handleDownload, disabled: downloading, className: "w-[300px] sm:flex-1 bg-gradient-to-r from-[#097c75] to-orange-500 \r\n                       text-white px-4 py-2 rounded-xl shadow-lg transition \r\n                       text-sm font-semibold flex items-center justify-center gap-2", children: [downloading ? (_jsx(Loader2, { className: "animate-spin w-5 h-5 shrink-0" })) : (_jsx(Download, { className: "w-5 h-5 shrink-0" })), _jsx("span", { className: "truncate", children: downloading ? t("resultItem.downloading") : t("resultItem.download") })] }), _jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: handleDelete, className: "w-[300px] sm:flex-1 border bg-white/70 backdrop-blur-md \r\n                       px-4 py-2 rounded-xl hover:bg-white transition shadow-sm \r\n                       text-sm font-semibold text-gray-700 flex items-center \r\n                       justify-center gap-2", children: [_jsx(Trash2, { className: "w-5 h-5 text-red-500 shrink-0" }), _jsx("span", { className: "truncate", children: t("resultItem.delete") })] })] })), _jsx(ConfirmModal, { isOpen: showConfirm, onConfirm: confirmDelete, onCancel: () => setShowConfirm(false) })] }));
};
export default ResultItem;
