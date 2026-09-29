import React from "react";
import { motion } from "framer-motion";
import { StagedFile } from "./types";
import { ArrowDownTrayIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

type Props = {
  staged: StagedFile;
  onCompress: (id: string) => Promise<void>;
  onCancel: (id: string) => void;
  formatSize: (size: number) => string;
};

const StagedItem: React.FC<Props> = ({ staged, onCompress, onCancel, formatSize }) => {
  const isConverting = staged.status === "compressing";
  const { t } = useTranslation();

  const handleCompress = async () => {
    await onCompress(staged.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-[300px] h-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-md flex flex-col p-6"
    >
      {/* Aperçu de l’image */}
      <div className="w-full relative">
        <img
          src={staged.previewUrl}
          alt={staged.name}
          className={`w-[300px] h-[250px] object-cover rounded-xl shadow-lg mx-auto 
            transition duration-2000 ease-in-out
            ${isConverting ? "filter blur-md opacity-60" : "blur-0 opacity-100"}`}
        />

        {/* ✅ Overlay loader + barre de progression */}
        {isConverting && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl transition-opacity duration-1500 ease-in-out">
            <Loader2 className="w-10 h-10 text-white animate-spin mb-3" />
            <div className="w-3/4 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-700 ease-in-out"
                style={{ width: `${staged.progress ?? 0}%` }}
              ></div>
            </div>
            <p className="text-white text-sm mt-2">{Math.round(staged.progress ?? 0)}%</p>
          </div>
        )}
      </div>

      {/* Nom et taille */}
      <p className="text-base text-gray-700 font-medium truncate text-center mt-3">
        {staged.name}
      </p>
      <p className="text-sm text-gray-500 text-center">{formatSize(staged.size)}</p>

      {/* Boutons d’action */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <motion.button
          onClick={handleCompress}
          disabled={isConverting}
          className="flex-1 bg-gradient-to-r from-[#097c75] to-orange-500 
                     text-white px-5 py-3 rounded-xl shadow-lg transition 
                     text-sm font-semibold flex items-center justify-center gap-2"
        >
          {isConverting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {t("stagedItem.converting")}
            </>
          ) : (
            <>
              <ArrowDownTrayIcon className="w-5 h-5 text-white" />
              {t("stagedItem.convert")}
            </>
          )}
        </motion.button>

        <motion.button
          onClick={() => onCancel(staged.id)}
          disabled={isConverting}
          className="flex-1 border bg-white/70 backdrop-blur-md 
                     px-5 py-3 rounded-xl hover:bg-white transition shadow-sm 
                     text-sm font-semibold text-gray-700 flex items-center justify-center gap-2"
        >
          <XCircleIcon className="w-5 h-5 text-red-500" />
          {t("stagedItem.cancel")}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StagedItem;
