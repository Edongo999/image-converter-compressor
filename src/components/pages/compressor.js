import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FileUploader from "@/components/Compressor/FileUploader";
import StagingList from "@/components/Compressor/StagingList";
import Controls from "@/components/Compressor/Controls";
import ResultsList from "@/components/Compressor/ResultsList";
import { useCompressor } from "@/components/hooks/useCompressor";
import { motion } from "framer-motion";
import ProgressModal from "@/components/Compressor/ProgressModal";
import SuccessToast from "@/components/Compressor/SuccessToast";
import ErrorToast from "@/components/Compressor/ErrorToast";
import SuccessDashboard from "@/components/Compressor/SuccessDashboard";
import ConfirmModal from "@/components/Compressor/ConfirmModal";
import { FaArrowLeft, FaFileImport } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const Compressor = () => {
    const { stagedFiles, results, quality, setQuality, outputFormat, setOutputFormat, successToast, setSuccessToast, errorToast, setErrorToast, isZipping, formatSize, calcReduction, handleFilesSelected, compressStagedFile, compressAllStaged, cancelStagedFile, cancelAllStaged, downloadAllAsZip, setResults, setStagedFiles, } = useCompressor();
    const [showProcessingModal, setShowProcessingModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [toastMode, setToastMode] = useState("single");
    const [conversionMode, setConversionMode] = useState("single");
    const { t } = useTranslation();
    const handleCancelClick = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };
    const handleDelete = () => {
        if (selectedId) {
            cancelStagedFile(selectedId);
            setShowConfirm(false);
        }
    };
    const handleEditImage = () => {
        if (selectedId) {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (e) => {
                const file = e.target.files?.[0];
                if (file) {
                    const previewUrl = URL.createObjectURL(file);
                    setStagedFiles((prev) => prev.map((f) => f.id === selectedId
                        ? { ...f, file, previewUrl, name: file.name, size: file.size }
                        : f));
                }
            };
            input.click();
            setShowConfirm(false);
        }
    };
    const resetAll = () => {
        setStagedFiles([]);
        setResults([]);
        setQuality(80);
        setOutputFormat("webp");
        setSuccessToast(false);
        setErrorToast(false);
        setConversionMode("single");
    };
    useEffect(() => {
        if (successToast) {
            const timer = setTimeout(() => setSuccessToast(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [successToast, setSuccessToast]);
    useEffect(() => {
        if (errorToast) {
            const timer = setTimeout(() => setErrorToast(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [errorToast, setErrorToast]);
    const globalProgress = results.length > 0
        ? Math.round((results.filter((r) => r.progress === 100).length / results.length) *
            100)
        : 0;
    const handleCompressOne = async (id) => {
        await compressStagedFile(id);
        setConversionMode("single");
        setToastMode("single");
        setSuccessToast(true);
    };
    const handleCompressAll = async () => {
        setShowProcessingModal(true);
        const totalFiles = stagedFiles.length;
        await compressAllStaged();
        const minDuration = Math.max(3000, totalFiles * 700);
        await new Promise((resolve) => setTimeout(resolve, minDuration));
        setShowProcessingModal(false);
        setConversionMode("batch");
        setToastMode("batch");
        setTimeout(() => setSuccessToast(true), 600);
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 relative overflow-hidden flex items-start justify-center py-10 sm:py-16 px-2 sm:px-6 md:px-12 mt-6 sm:mt-8", children: [_jsx(motion.div, { className: "absolute -top-20 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-[#097c75]/30 blur-3xl rounded-full" }), _jsx(motion.div, { className: "absolute -bottom-20 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-orange-400/30 blur-3xl rounded-full" }), _jsx(motion.div, { className: "absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-b from-orange-400/40 to-orange-600/30 blur-3xl rounded-full" }), _jsxs("div", { className: "w-full max-w-5xl relative z-10 space-y-10 px-4 sm:px-6 md:px-8", children: [_jsx(SuccessToast, { visible: successToast, mode: toastMode, onHide: () => setSuccessToast(false) }), _jsx(ErrorToast, { visible: errorToast, message: t("compressor.errorMaxImages") }), _jsx(ProgressModal, { visible: showProcessingModal, progress: globalProgress, totalFiles: stagedFiles.length }), _jsx(ConfirmModal, { isOpen: showConfirm, onConfirm: handleDelete, onCancel: () => setShowConfirm(false), onEdit: handleEditImage }), results.length === 0 && (_jsx("h2", { className: "mt-8 sm:mt-12 md:mt-10 text-3xl sm:text-4xl md:text-5xl \r\n                        font-extrabold [font-family:'Montserrat',sans-serif] \r\n                        bg-gradient-to-r from-[#097c75] to-orange-500 \r\n                        bg-clip-text text-transparent text-center", children: t("compressor.title") })), results.length === 0 ? (_jsx(FileUploader, { onFilesSelected: handleFilesSelected, disabled: stagedFiles.length >= 10, currentCount: stagedFiles.length, maxCount: 10 })) : conversionMode === "batch" ? (_jsx("div", { className: "mt-12 sm:mt-12 md:mt-8", children: _jsx(SuccessDashboard, { convertedCount: results.length, totalSizeBefore: formatSize(results.reduce((acc, r) => acc + (r.originalSize ?? 0), 0)), totalSizeAfter: formatSize(results.reduce((acc, r) => acc + (r.compressedSize ?? 0), 0)), reduction: calcReduction(results.reduce((acc, r) => acc + (r.originalSize ?? 0), 0), results.reduce((acc, r) => acc + (r.compressedSize ?? 0), 0)), onReset: resetAll, onDownloadZip: downloadAllAsZip, isZipping: isZipping }) })) : null, stagedFiles.length > 0 && (_jsxs(_Fragment, { children: [_jsx("h2", { className: "text-2xl sm:text-5xl font-bold text-center mt-10 mb-6 [font-family:'Montserrat',sans-serif] bg-gradient-to-r from-[#097c75] to-orange-500 bg-clip-text text-transparent mb-15", children: t("compressor.imported") }), _jsxs("div", { className: "flex flex-col sm:flex-row items-start justify-start gap-20 mb-6", children: [_jsxs("div", { className: "flex gap-4", children: [_jsx("button", { onClick: handleCompressAll, className: "px-6 py-2 bg-[#097c75] text-white font-semibold shadow hover:scale-105 transition rounded-md whitespace-nowrap", children: t("compressor.compressAll") }), _jsx("button", { onClick: cancelAllStaged, className: "px-6 py-2 bg-red-500 text-white font-semibold shadow hover:scale-105 transition rounded-md whitespace-nowrap", children: t("compressor.cancelAll") })] }), _jsx("div", { className: "flex gap-4", children: _jsx(Controls, { quality: quality, setQuality: setQuality, outputFormat: outputFormat, setOutputFormat: setOutputFormat }) })] }), _jsx(StagingList, { stagedFiles: stagedFiles, onCompressOne: handleCompressOne, onCancelOne: handleCancelClick, formatSize: formatSize })] })), results.length > 0 && (_jsx(ResultsList, { results: results, setResults: setResults, outputFormat: outputFormat, formatSize: formatSize, calcReduction: calcReduction })), _jsxs("div", { className: "mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center", children: [_jsxs(Link, { to: "/", className: "w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#097c75] to-orange-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition font-semibold", children: [_jsx(FaArrowLeft, { className: "text-lg" }), " ", t("compressor.back")] }), stagedFiles.length === 0 && results.length === 0 && (_jsxs("button", { onClick: () => document.querySelector('input[type="file"]')?.click(), className: "w-full sm:w-auto flex items-center justify-center gap-2 border bg-white/70 backdrop-blur-md px-6 py-3 rounded-xl hover:bg-white transition shadow-sm font-semibold text-gray-700", children: [_jsx(FaFileImport, { className: "text-lg text-blue-600" }), " ", t("compressor.importFile")] }))] })] })] }));
};
export default Compressor;
