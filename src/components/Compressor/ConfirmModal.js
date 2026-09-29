import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TrashIcon, PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
const ConfirmModal = ({ isOpen, onConfirm, onCancel, onEdit }) => {
    const { t } = useTranslation();
    return ReactDOM.createPortal(_jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { className: "fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm", initial: { backgroundColor: "rgba(0,0,0,0)", opacity: 0 }, animate: { backgroundColor: "rgba(0,0,0,0.4)", opacity: 1 }, exit: { backgroundColor: "rgba(0,0,0,0)", opacity: 0 }, transition: { duration: 0.6, ease: "easeInOut" }, children: _jsxs(motion.div, { className: "bg-white rounded-xl shadow-lg p-6 w-[340px] text-center", initial: { y: -200, opacity: 0, scale: 0.9 }, animate: { y: 0, opacity: 1, scale: 1 }, exit: { y: 100, opacity: 0, scale: 0.95 }, transition: {
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                }, children: [_jsx("p", { className: "text-gray-700 font-medium mb-4", children: t("confirmModal.message") }), _jsxs("div", { className: "flex flex-col gap-3", children: [_jsxs("button", { onClick: onConfirm, className: "flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition", children: [_jsx(TrashIcon, { className: "w-5 h-5" }), t("confirmModal.delete")] }), onEdit && (_jsxs("button", { onClick: onEdit, className: "flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition", children: [_jsx(PencilSquareIcon, { className: "w-5 h-5" }), t("confirmModal.edit")] })), _jsxs("button", { onClick: onCancel, className: "flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition", children: [_jsx(XCircleIcon, { className: "w-5 h-5 text-gray-600" }), t("confirmModal.cancel")] })] })] }) })) }), document.body);
};
export default ConfirmModal;
