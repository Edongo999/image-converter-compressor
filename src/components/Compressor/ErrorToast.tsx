import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

type Props = {
  visible: boolean;
  message: string;
};

const ErrorToast: React.FC<Props> = ({ visible, message }) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 flex items-center justify-center z-[9999] px-4"
        >
          <div
            className="
              bg-gradient-to-r from-red-500 to-red-400 text-white 
              w-[85%] sm:w-auto max-w-sm sm:max-w-md md:max-w-lg
              px-3 sm:px-6 md:px-8 
              py-2 sm:py-4 
              rounded-2xl shadow-lg shadow-red-200 
              flex flex-col items-center gap-2 
              text-sm sm:text-base md:text-lg
              text-center
              break-words whitespace-pre-line
              backdrop-blur-sm
            "
          >
            <div className="bg-white/20 rounded-full p-2 mb-2">
              <ExclamationTriangleIcon className="w-7 h-7 text-white" />
            </div>
            <span className="font-semibold">{message || t("errorToast.defaultMessage")}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorToast;
