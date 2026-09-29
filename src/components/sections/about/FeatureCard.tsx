import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string; // clé i18n
  desc: string;  // clé i18n
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, desc, delay = 0 }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 200,
        duration: 0.8,
        ease: "easeOut",
        delay,
      }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      className="group relative p-6 bg-white/30 backdrop-blur-2xl border border-white/40 rounded-2xl shadow-md overflow-hidden hover:bg-[#097c75] hover:text-white"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-4 left-4 w-12 h-12 bg-[#097c75]/20 blur-xl rounded-full"
      />

      <div className="relative z-10">
        <Icon className="text-[#097c75] group-hover:text-white mb-3" size={28} />
        <h3 className="text-lg font-bold mb-2">{t(title)}</h3>
        <p className="text-sm">{t(desc)}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
