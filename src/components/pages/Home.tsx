import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Shield,
  Smartphone,
  ArrowRight,
  Image as ImageIcon,
  Rocket
} from "lucide-react";

import HeroDemo from "@/components/sections/home/HeroDemo";
import StatsBlock from "@/components/sections/home/StatsBlock";
import FeatureCard from "@/components/sections/home/FeatureCard";
import { useTranslation } from "react-i18next";

// Variants pour cascade fade-in
const fadeVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay }
  })
};

const Home: React.FC = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">

      {/* HERO */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative grid md:grid-cols-2 items-center px-6 sm:px-10 md:px-20 pt-24 md:pt-28 pb-16 gap-12 md:gap-16 overflow-hidden mt-10 sm:mt-0"
      >
        {/* GLOW BACKGROUND */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#097c75]/30 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-400/30 blur-3xl rounded-full animate-pulse"></div>
        <motion.div
          initial={{ opacity: 0.3, scale: 0.9 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-b from-orange-400/40 to-orange-600/30 blur-3xl rounded-full"
        />

        {/* LEFT */}
        <motion.div variants={fadeVariant} custom={0.4}>
          <span className="flex items-center gap-2 text-[#097c75] bg-white/70 backdrop-blur-md border border-white/40 px-4 py-1 rounded-full text-sm font-medium w-fit shadow-sm">
            <ImageIcon size={14} />
            {t("home.hero.badge")}
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mt-6 tracking-tight">
            {t("home.hero.title")}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#097c75] to-orange-500">
              {t("home.hero.subtitle")}
            </span>
          </h1>

          <p className="text-gray-600 mt-6 text-base sm:text-lg">
            {t("home.hero.description")}
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              to="/compressor"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#097c75] to-orange-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition"
            >
              <Rocket size={18} />
              {t("home.hero.start")}
              <ArrowRight size={18} />
            </Link>

            <button
              onClick={() => setShowDemoModal(true)}
              className="flex items-center justify-center gap-2 border bg-white/70 backdrop-blur-md px-6 py-3 rounded-xl hover:bg-white transition shadow-sm"
            >
              <ImageIcon size={18} />
              {t("home.hero.demo")}
            </button>
          </div>

          <StatsBlock />
        </motion.div>

        {/* RIGHT */}
        <motion.div
          layout
          variants={fadeVariant}
          custom={1.0}
          animate={showDemoModal ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative p-6 rounded-xl"
        >
          <HeroDemo />
        </motion.div>
      </motion.section>

      {/* FEATURES */}
      <motion.section
        id="demo-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative px-6 sm:px-10 md:px-20 pb-28 overflow-hidden"
      >
        <div className="relative grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
            { icon: Zap, title: "home.features.fast.title", desc: "home.features.fast.desc" },
            { icon: Shield, title: "home.features.secure.title", desc: "home.features.secure.desc" },
            { icon: Smartphone, title: "home.features.multi.title", desc: "home.features.multi.desc" }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeVariant} custom={i * 0.6 + 0.6}>
              <FeatureCard icon={item.icon} title={item.title} desc={item.desc} delay={i * 0.2} />
            </motion.div>
          ))}

        </div>
      </motion.section>

      {/* MODAL */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl relative">
              <button
                onClick={() => setShowDemoModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4 text-[#097c75]">
                {t("home.modal.title")}
              </h2>
              <HeroDemo />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
