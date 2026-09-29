import { jsx as _jsx } from "react/jsx-runtime";
import { AnimatePresence } from "framer-motion";
import StagedItem from "./StagedItem";
const StagingList = ({ stagedFiles, onCompressOne, onCancelOne, formatSize, }) => {
    if (stagedFiles.length === 0)
        return null;
    return (_jsx("div", { className: "w-full mb-10", children: _jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 \r\n                        gap-x-8 md:gap-x-12 lg:gap-x-80 \r\n                        gap-y-6 md:gap-y-10 lg:gap-y-12 \r\n                        justify-items-center", children: _jsx(AnimatePresence, { children: stagedFiles.map((s) => (_jsx(StagedItem, { staged: s, onCompress: onCompressOne, onCancel: onCancelOne, formatSize: formatSize }, s.id))) }) }) }) }));
};
export default StagingList;
