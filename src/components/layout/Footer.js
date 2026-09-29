import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { FaRocket, FaLock, FaGlobe, FaMagic, FaEnvelope, FaLaptopCode, } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const Footer = () => {
    const { t } = useTranslation();
    const [index, setIndex] = useState(0);
    const messages = [
        { text: t("footer.messages.fast"), icon: _jsx(FaRocket, {}) },
        { text: t("footer.messages.optimize"), icon: _jsx(FaMagic, {}) },
        { text: t("footer.messages.confidentiality"), icon: _jsx(FaLock, {}) },
        { text: t("footer.messages.accessible"), icon: _jsx(FaGlobe, {}) },
        { text: t("footer.messages.contact"), icon: _jsx(FaEnvelope, {}) },
        { text: t("footer.messages.customDev"), icon: _jsx(FaLaptopCode, {}) },
        { text: t("footer.messages.ally"), icon: _jsx(FaMagic, {}) },
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [messages.length]);
    return (_jsxs("footer", { className: "w-full bg-gradient-to-r from-[#097c75] to-orange-500 text-white shadow-inner mt-0", children: [_jsxs("div", { className: "max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-6", children: [_jsxs("div", { className: "flex items-center gap-2 font-semibold animate-pulse", children: [messages[index].icon, _jsx("span", { children: messages[index].text })] }), _jsxs("div", { className: "text-center sm:text-right", children: [_jsx("p", { className: "text-sm", children: t("footer.attribution") }), _jsx("a", { href: "https://portfolio-frank-landry.vercel.app/", target: "_blank", rel: "noopener noreferrer", className: "underline hover:text-yellow-300 text-sm font-medium", children: t("footer.link") })] })] }), _jsx("div", { className: "text-center text-xs py-3 bg-black/20", children: t("footer.copyright") })] }));
};
export default Footer;
