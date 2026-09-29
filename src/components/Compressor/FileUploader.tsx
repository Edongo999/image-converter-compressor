import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { FaExclamationCircle, FaCloudUploadAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

type Props = {
  onFilesSelected: (files: FileList | null) => void;
  disabled?: boolean;
  currentCount?: number;
  maxCount?: number;
};

const FileUploader = forwardRef(
  ({ onFilesSelected, disabled = false, currentCount = 0, maxCount = 10 }: Props, ref) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
      triggerFileDialog: () => {
        if (!disabled) inputRef.current?.click();
      },
    }));

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setIsDragActive(false);
      if (!disabled && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onFilesSelected(e.dataTransfer.files);
        e.dataTransfer.clearData();
      }
    };

    return (
      <motion.label
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragActive(true);
        }}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={handleDrop}
        className={`w-full max-w-xl h-56 sm:h-72 flex flex-col items-center justify-center 
                    border-2 border-dashed rounded-2xl shadow-lg mb-4 transition mx-auto 
                    ${disabled 
                      ? "border-red-500 bg-red-50 cursor-not-allowed opacity-80" 
                      : isDragActive
                        ? "border-green-500 bg-green-50 scale-105 cursor-pointer"
                        : "border-blue-600 bg-gradient-to-r from-blue-50 to-orange-100 cursor-pointer"
                    }`}
      >
        {disabled ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [0, -6, 6, -6, 6, 0] }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-2 mt-3"
          >
            <div className="flex items-center gap-2 text-red-600">
              <FaExclamationCircle className="text-2xl" />
              <span className="text-base sm:text-lg font-semibold text-center">
                {t("fileUploader.limitReached", { maxCount })}
              </span>
            </div>
            <span className="text-sm text-red-500 text-center">
              {t("fileUploader.removeOne")}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {currentCount}/{maxCount} {t("fileUploader.imagesUsed")}
            </span>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center space-y-2 mt-3">
            <div className="flex items-center gap-2 text-gray-700">
              <FaCloudUploadAlt className="text-2xl text-blue-600" />
              <span className="text-base sm:text-lg font-semibold text-center">
                {isDragActive ? t("fileUploader.dropHere") : t("fileUploader.dragDrop")}
              </span>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 text-center">
              {t("fileUploader.orClick")}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {currentCount}/{maxCount} {t("fileUploader.imagesUsed")}
            </span>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          disabled={disabled}
          onChange={(e) => !disabled && onFilesSelected(e.target.files)}
          className="hidden"
        />
      </motion.label>
    );
  }
);

export default FileUploader;
