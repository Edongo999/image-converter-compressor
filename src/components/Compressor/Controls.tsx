import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  quality: number;
  setQuality: (q: number) => void;
  outputFormat: string;
  setOutputFormat: (f: string) => void;
};

const Controls: React.FC<Props> = ({
  quality,
  setQuality,
  outputFormat,
  setOutputFormat,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row gap-12 w-full items-center justify-between">
      
      {/* ✅ Contrôle qualité */}
      <div className="flex-1 max-w-xs w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
          {t("controls.quality")} {quality}%
        </label>
        <input
          type="range"
          min={10}
          max={100}
          step={5}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full accent-[#097c75]"
        />
      </div>

      {/* ✅ Contrôle format */}
      <div className="flex-1 max-w-xs w-full">
        <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
          {t("controls.outputFormat")}
        </label>
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:ring-[#097c75] focus:border-[#097c75]"
        >
          <option value="webp">WebP</option>
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="avif">AVIF</option>
          <option value="pdf">PDF</option>
          <option value="original">{t("controls.original")}</option>
        </select>
      </div>
    </div>
  );
};

export default Controls;
