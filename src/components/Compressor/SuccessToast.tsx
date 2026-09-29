import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import confetti from "canvas-confetti";
import { useTranslation } from "react-i18next";

type Props = {
  visible: boolean;
  onHide?: () => void;
  mode?: "single" | "batch";
};

const SuccessToast: React.FC<Props> = ({ visible, onHide, mode = "batch" }) => {
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
          colors:
            mode === "batch"
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

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center z-[9999] px-4"
        >
          <div
            className={`
              ${mode === "batch" ? "bg-green-600" : "bg-orange-600"} 
              text-white 
              w-full max-w-sm sm:max-w-md
              px-4 sm:px-6 
              py-3 sm:py-4 
              rounded-xl shadow-lg 
              flex items-center justify-center gap-2 sm:gap-3 
              text-sm sm:text-base md:text-lg
            `}
          >
            <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
            <span className="font-semibold text-center">
              {mode === "batch"
                ? t("successToast.batch")
                : t("successToast.single")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessToast;
