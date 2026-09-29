import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Zap, Shield, TrendingDown } from "lucide-react";
import { useTranslation } from "react-i18next";
const StatsBlock = () => {
    const { t } = useTranslation();
    return (_jsxs("div", { className: "grid grid-cols-3 gap-6 mt-10 text-gray-700", children: [_jsxs("div", { children: [_jsx(TrendingDown, { className: "text-[#097c75]", size: 18 }), _jsx("p", { className: "text-2xl font-bold text-[#097c75]", children: "+10k" }), _jsx("p", { className: "text-xs", children: t("home.stats.images") })] }), _jsxs("div", { children: [_jsx(Shield, { className: "text-[#097c75]", size: 18 }), _jsx("p", { className: "text-2xl font-bold text-[#097c75]", children: "0%" }), _jsx("p", { className: "text-xs", children: t("home.stats.server") })] }), _jsxs("div", { children: [_jsx(Zap, { className: "text-[#097c75]", size: 18 }), _jsx("p", { className: "text-2xl font-bold text-[#097c75]", children: t("home.stats.speedValue") }), _jsx("p", { className: "text-xs", children: t("home.stats.speedLabel") })] })] }));
};
export default StatsBlock;
