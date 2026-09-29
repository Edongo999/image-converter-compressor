import React from "react";
import { AnimatePresence } from "framer-motion";
import { CompressedResult } from "./types";
import ResultItem from "./ResultItem";
import { useTranslation } from "react-i18next";

type Props = {
  results: CompressedResult[];
  setResults: React.Dispatch<React.SetStateAction<CompressedResult[]>>;
  outputFormat: string;
  formatSize: (size: number) => string;
  calcReduction: (original: number, compressed: number) => string;
};

const ResultsList: React.FC<Props> = ({ results, setResults, outputFormat, formatSize, calcReduction }) => {
  const { t } = useTranslation();

  if (results.length === 0) return null;

  const handleDelete = (i: number) => {
    setResults(prev => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div className="w-full mb-10">
      {/* En-tête pleine largeur */}
      <div className="bg-gradient-to-r from-[#097c75] to-orange-500 py-8 mt-12 shadow-md w-screen relative -ml-[calc(50vw-50%)]">
        <h3 className="flex items-center justify-center gap-3 text-2xl sm:text-3xl font-bold text-white tracking-wide">
          <svg xmlns="http://www.w3.org/2000/svg" 
               className="h-7 w-7 text-orange-400" 
               fill="currentColor" 
               viewBox="0 0 24 24">
            <path d="M12 2L15 8H9l3-6zm0 20l-3-6h6l-3 6zM2 12l6-3v6l-6-3zm20 0l-6 3v-6l6 3z"/>
          </svg>
          {t("resultsList.title")}
        </h3>
      </div>

      {/* ✅ Grille identique à StagingList */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
                        gap-x-6 md:gap-x-10 lg:gap-x-82 
                        gap-y-6 md:gap-y-10 lg:gap-y-12 
                        justify-items-center w-full">
          <AnimatePresence>
            {results.map((res, idx) => (
              <ResultItem
                key={idx}
                res={res}
                index={idx}
                outputFormat={outputFormat}
                formatSize={formatSize}
                calcReduction={calcReduction}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ResultsList;
