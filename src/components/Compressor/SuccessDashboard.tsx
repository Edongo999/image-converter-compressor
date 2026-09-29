import { motion } from "framer-motion";
import { CheckCircleIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

type Props = {
  convertedCount: number;
  totalSizeBefore: string;
  totalSizeAfter: string;
  reduction: string;
  onReset: () => void;
  onDownloadZip: () => void;
  isZipping: boolean;
};

const SuccessDashboard: React.FC<Props> = ({
  convertedCount,
  totalSizeBefore,
  totalSizeAfter,
  reduction,
  onReset,
  onDownloadZip,
  isZipping,
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl shadow-2xl p-10 max-w-3xl mx-auto text-center space-y-6"
    >
      {/* ✅ Icône de succès */}
      <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
      <h2 className="text-3xl font-bold text-gray-800">
        {t("successDashboard.title")}
      </h2>

      {/* ✅ Stats avec icônes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
        <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center">
          <ChartBarIcon className="w-6 h-6 text-green-600 mb-2" />
          <p className="text-sm text-gray-500">{t("successDashboard.imagesConverted")}</p>
          <p className="text-xl font-bold text-green-600">{convertedCount}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
          <ArrowUpTrayIcon className="w-6 h-6 text-blue-600 mb-2" />
          <p className="text-sm text-gray-500">{t("successDashboard.before")}</p>
          <p className="text-xl font-bold text-blue-600">{totalSizeBefore}</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 flex flex-col items-center">
          <ArrowDownTrayIcon className="w-6 h-6 text-orange-600 mb-2" />
          <p className="text-sm text-gray-500">{t("successDashboard.after")}</p>
          <p className="text-xl font-bold text-orange-600">{totalSizeAfter}</p>
        </div>
      </div>

      <p className="text-gray-600 mt-4">
        {parseFloat(reduction) > 0
          ? t("successDashboard.totalReduction")
          : t("successDashboard.totalIncrease")}
        <span
          className={`font-bold ${
            parseFloat(reduction) > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {reduction}
        </span>
      </p>

      {/* ✅ Boutons d’action */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <button
          onClick={onDownloadZip}
          disabled={isZipping}
          className={`px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition flex items-center justify-center gap-2 ${
            !isZipping
              ? "bg-gradient-to-r from-blue-600 via-blue-800 to-blue-900 hover:scale-105"
              : "bg-blue-800 cursor-wait"
          }`}
        >
          {isZipping ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            <ArrowDownTrayIcon className="w-5 h-5 text-white" />
          )}
          {isZipping ? t("successDashboard.preparingZip") : t("successDashboard.downloadZip")}
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-[#097c75] text-white rounded-xl shadow-lg hover:scale-105 transition font-semibold flex items-center gap-2 justify-center"
        >
          <ArrowUpTrayIcon className="w-5 h-5 text-white" />
          {t("successDashboard.importNew")}
        </button>
      </div>
    </motion.div>
  );
};

export default SuccessDashboard;
