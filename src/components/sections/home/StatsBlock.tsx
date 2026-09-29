import React from "react";
import { Zap, Shield, TrendingDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const StatsBlock: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-3 gap-6 mt-10 text-gray-700">
      {/* Stat 1 : Images compressées */}
      <div>
        <TrendingDown className="text-[#097c75]" size={18} />
        <p className="text-2xl font-bold text-[#097c75]">+10k</p>
        <p className="text-xs">{t("home.stats.images")}</p>
      </div>

      {/* Stat 2 : Serveur sécurisé */}
      <div>
        <Shield className="text-[#097c75]" size={18} />
        <p className="text-2xl font-bold text-[#097c75]">0%</p>
        <p className="text-xs">{t("home.stats.server")}</p>
      </div>

      {/* Stat 3 : Ultra Rapide */}
      <div>
        <Zap className="text-[#097c75]" size={18} />
        <p className="text-2xl font-bold text-[#097c75]">{t("home.stats.speedValue")}</p>
        <p className="text-xs">{t("home.stats.speedLabel")}</p>
      </div>
    </div>
  );
};

export default StatsBlock;
