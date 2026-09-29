import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AnimatePresence } from "framer-motion";
import ResultItem from "./ResultItem";
import { useTranslation } from "react-i18next";
const ResultsList = ({ results, setResults, outputFormat, formatSize, calcReduction }) => {
    const { t } = useTranslation();
    if (results.length === 0)
        return null;
    const handleDelete = (i) => {
        setResults(prev => prev.filter((_, idx) => idx !== i));
    };
    return (_jsxs("div", { className: "w-full mb-10", children: [_jsx("div", { className: "bg-gradient-to-r from-[#097c75] to-orange-500 py-8 mt-12 shadow-md w-screen relative -ml-[calc(50vw-50%)]", children: _jsxs("h3", { className: "flex items-center justify-center gap-3 text-2xl sm:text-3xl font-bold text-white tracking-wide", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-7 w-7 text-orange-400", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M12 2L15 8H9l3-6zm0 20l-3-6h6l-3 6zM2 12l6-3v6l-6-3zm20 0l-6 3v-6l6 3z" }) }), t("resultsList.title")] }) }), _jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 \r\n                        gap-x-6 md:gap-x-10 lg:gap-x-82 \r\n                        gap-y-6 md:gap-y-10 lg:gap-y-12 \r\n                        justify-items-center w-full", children: _jsx(AnimatePresence, { children: results.map((res, idx) => (_jsx(ResultItem, { res: res, index: idx, outputFormat: outputFormat, formatSize: formatSize, calcReduction: calcReduction, onDelete: handleDelete }, idx))) }) }) })] }));
};
export default ResultsList;
