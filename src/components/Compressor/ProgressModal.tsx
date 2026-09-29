import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

type Props = {
  visible: boolean;
  progress: number;
  totalFiles?: number;
};

const ProgressModal: React.FC<Props> = ({ visible, progress, totalFiles = 1 }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [lastChange, setLastChange] = useState(() => Date.now());
  const { t } = useTranslation();

  const messages = [
    { text: t("progressModal.wait"), color: "text-gray-800" },
    { text: t("progressModal.compressing"), color: "text-orange-600" },
    { text: t("progressModal.finalizing"), color: "text-green-600" },
  ];

  useEffect(() => {
    if (!visible) return;

    const baseDuration = 2000;
    const durationFactor = Math.min(3, totalFiles / 5);
    const minDisplay = baseDuration * durationFactor;

    const now = Date.now();
    const elapsed = now - lastChange;

    const timer = setTimeout(() => {
      if (elapsed < minDisplay) return;

      if (progress < 30 && currentMessage !== 0) {
        setCurrentMessage(0);
        setLastChange(now);
      } else if (progress >= 30 && progress < 80) {
        if (currentMessage !== 1) {
          setCurrentMessage(1);
          setLastChange(now);
        }
      } else if (progress >= 80 && currentMessage !== 2) {
        setCurrentMessage(2);
        setLastChange(now);
      }
    }, minDisplay);

    return () => clearTimeout(timer);
  }, [progress, visible, totalFiles, currentMessage, lastChange]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-[9999]"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 rounded-2xl shadow-xl p-8 text-center max-w-sm w-full flex flex-col items-center gap-6 min-h-[220px]"
          >
            <AnimatePresence mode="wait">
              <motion.h3
                key={messages[currentMessage].text}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`text-xl font-bold ${messages[currentMessage].color}`}
              >
                {messages[currentMessage].text}
              </motion.h3>
            </AnimatePresence>

            <p className="text-gray-600">
              {t("progressModal.progressLabel")} {progress}%
            </p>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="bg-blue-500 h-3"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProgressModal;
