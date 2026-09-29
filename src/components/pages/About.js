import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Users, Globe, Rocket, Shield } from "lucide-react";
import FeatureCard from "@/components/sections/about/FeatureCard";
import StatCard from "@/components/sections/about/StatCard";
import TestimonialCard from "@/components/sections/about/TestimonialCard";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const About = () => {
    const { t } = useTranslation();
    const stats = [
        { value: 10000, label: t("about.stats.imagesCompressed") },
        { value: 5000, label: t("about.stats.usersSatisfied") },
        { value: 2, label: t("about.stats.secondsPerConversion") },
    ];
    const testimonials = [
        { name: "Sarah M.", role: t("about.testimonials.designer"), text: t("about.testimonials.text1") },
        { name: "Frank Landry.", role: t("about.testimonials.developer"), text: t("about.testimonials.text2") },
        { name: "Amina T.", role: t("about.testimonials.manager"), text: t("about.testimonials.text3") },
    ];
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 relative overflow-hidden", children: _jsxs(motion.section, { initial: "hidden", whileInView: "visible", viewport: { once: true }, className: "relative px-2 sm:px-6 md:px-12 pt-24 md:pt-28 pb-16 max-w-7xl mx-auto space-y-12", children: [_jsxs(motion.h1, { className: "text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-6", children: [t("about.title"), " ", _jsx("span", { className: "block text-transparent bg-clip-text bg-gradient-to-r from-[#097c75] to-orange-500", children: t("about.app") })] }), _jsx(motion.p, { className: "text-gray-600 mt-6 text-base sm:text-lg max-w-3xl", children: t("about.description") }), _jsxs(motion.div, { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12", children: [_jsx(FeatureCard, { icon: Users, title: t("about.features.accessible"), desc: t("about.features.accessibleDesc"), delay: 0.2 }), _jsx(FeatureCard, { icon: Globe, title: t("about.features.available"), desc: t("about.features.availableDesc"), delay: 0.4 }), _jsx(FeatureCard, { icon: Rocket, title: t("about.features.fast"), desc: t("about.features.fastDesc"), delay: 0.6 }), _jsx(FeatureCard, { icon: Shield, title: t("about.features.secure"), desc: t("about.features.secureDesc"), delay: 0.8 })] }), _jsx(motion.div, { className: "flex justify-center mt-16", children: _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: stats.map((stat, i) => (_jsx(StatCard, { value: stat.value, label: stat.label, delay: 0.5 + i * 0.3 }, i))) }) }), _jsxs(motion.div, { className: "mt-20", children: [_jsx(motion.h2, { className: "text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#097c75] via-orange-400 to-[#097c75] animate-gradient-smooth", children: t("about.testimonials.title") }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: testimonials.map((tst, i) => (_jsx(TestimonialCard, { text: tst.text, name: tst.name, role: tst.role, delay: 1 + i * 0.3 }, i))) })] }), _jsxs(motion.div, { className: "mt-12 flex flex-col sm:flex-row gap-4", children: [_jsx("a", { href: "/compressor", className: "flex-1 text-center bg-gradient-to-r from-[#097c75] to-orange-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition font-semibold", children: t("about.cta.try") }), _jsxs("a", { href: "https://wa.me/+237676471601", target: "_blank", rel: "noopener noreferrer", className: "flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-transform duration-300 font-semibold", children: [_jsx(FaWhatsapp, { className: "text-xl animate-bounce" }), t("about.cta.contact")] })] })] }) }));
};
export default About;
