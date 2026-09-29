import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
export default function AnimatedModal({ isOpen, onClose, onKeyDown, children }) {
    const [visible, setVisible] = useState(false);
    const isClient = typeof document !== "undefined";
    // Effet uniquement pour l'animation d'entrée (ne met pas setVisible(false) ici)
    useEffect(() => {
        if (!isClient)
            return;
        if (!isOpen)
            return;
        const t = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(t);
    }, [isOpen, isClient]);
    // Gestion clavier et fermeture (Escape déclenche la fermeture animée)
    useEffect(() => {
        if (!isOpen)
            return;
        const handler = (e) => {
            if (e.key === "Escape") {
                // Démarrer l'animation de sortie puis appeler onClose après la durée
                setVisible(false);
                setTimeout(onClose, 220);
            }
            if (onKeyDown)
                onKeyDown(e);
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [isOpen, onClose, onKeyDown]);
    if (!isClient || !isOpen)
        return null;
    const modalRoot = document.body;
    return createPortal(_jsxs("div", { className: "modal-backdrop", onClick: () => {
            setVisible(false);
            setTimeout(onClose, 220);
        }, "aria-modal": "true", role: "dialog", children: [_jsx("div", { className: `modal-backdrop__bg ${visible ? "" : "hide"}` }), _jsx("div", { className: `modal-content ${visible ? "" : "hide"}`, onClick: (e) => e.stopPropagation(), children: children })] }), modalRoot);
}
