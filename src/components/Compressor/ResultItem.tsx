import React, { useState } from "react";
import { motion } from "framer-motion";
import { CompressedResult } from "./types";
import { Download, Trash2, Loader2 } from "lucide-react";
import ConfirmModal from "./ConfirmModal"; 
import PdfPreview from "./PdfPreview";
import { useTranslation } from "react-i18next";

type Props = {
  res: CompressedResult;
  index: number;
  outputFormat: string;
  formatSize: (size: number) => string;
  calcReduction: (original: number, compressed: number) => string;
  onDelete?: (index: number) => void;
};

const ResultItem: React.FC<Props> = ({ res, index, outputFormat, formatSize, calcReduction, onDelete }) => {
  const [downloading, setDownloading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { t } = useTranslation();

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = res.compressed!;
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-[300px] h-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-md flex flex-col p-6"
    >
      <div className="w-full aspect-square relative">
        {outputFormat === "pdf" ? (
          <PdfPreview url={res.compressed ?? res.original} />
        ) : (
          <img
            src={res.compressed ?? res.original}
            alt={`converted-${index}`}
            className={`w-[300px] h-[250px] object-cover rounded-xl shadow-lg mx-auto 
              transition duration-2000 ease-in-out
              ${res.progress < 100 ? "blur-md opacity-60" : "blur-0 opacity-100"}`}
          />
        )}

        {/* ✅ Overlay progressif */}
        {res.progress !== undefined && res.progress < 100 && (
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center rounded-xl transition-opacity duration-1500 ease-in-out">
            <Loader2 className="w-10 h-10 text-white animate-spin mb-3" />
            <div className="w-3/4 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-700 ease-in-out"
                style={{ width: `${res.progress}%` }}
              ></div>
            </div>
            <p className="text-white text-sm mt-2">{Math.round(res.progress)}%</p>
          </div>
        )}
      </div>

      <p className="text-base text-gray-700 font-medium truncate text-center mt-3">
        {`converted-${index}.${outputFormat === "original" ? "jpg" : outputFormat}`}
      </p>
      <p className="text-sm text-gray-500 text-center">
        {t("resultItem.original")} : {res.originalSize ? formatSize(res.originalSize) : "N/A"}
      </p>

      {res.compressed && res.progress === 100 && (
        <>
          <p className="text-sm text-gray-500 text-center">
            {t("resultItem.optimized")} : {res.compressedSize ? formatSize(res.compressedSize) : "N/A"}
          </p>
          <p
            className={`font-semibold text-center ${
              res.originalSize && res.compressedSize && res.compressedSize < res.originalSize
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {res.originalSize && res.compressedSize
              ? res.compressedSize < res.originalSize
                ? `${t("resultItem.reduction")} : ${calcReduction(res.originalSize, res.compressedSize)}`
                : `${t("resultItem.increase")} : +${(
                    ((res.compressedSize - res.originalSize) / res.originalSize) *
                    100
                  ).toFixed(1)}%`
              : "N/A"}
          </p>
        </>
      )}

      {res.compressed && res.progress === 100 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4 w-full max-w-[300px] mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            disabled={downloading}
            className="w-[300px] sm:flex-1 bg-gradient-to-r from-[#097c75] to-orange-500 
                       text-white px-4 py-2 rounded-xl shadow-lg transition 
                       text-sm font-semibold flex items-center justify-center gap-2"
          >
            {downloading ? (
              <Loader2 className="animate-spin w-5 h-5 shrink-0" />
            ) : (
              <Download className="w-5 h-5 shrink-0" />
            )}
            <span className="truncate">
              {downloading ? t("resultItem.downloading") : t("resultItem.download")}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="w-[300px] sm:flex-1 border bg-white/70 backdrop-blur-md 
                       px-4 py-2 rounded-xl hover:bg-white transition shadow-sm 
                       text-sm font-semibold text-gray-700 flex items-center 
                       justify-center gap-2"
          >
            <Trash2 className="w-5 h-5 text-red-500 shrink-0" />
            <span className="truncate">{t("resultItem.delete")}</span>
          </motion.button>
        </div>
      )}

      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </motion.div>
  );
};

export default ResultItem;
