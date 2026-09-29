import React from "react";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  text: string;   // ✅ ajouté
  name: string;
  role: string;
  delay?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ text, name, role, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05, rotate: 1 }}
    whileTap={{ scale: 0.98 }}
    transition={{
      type: "spring",
      stiffness: 250,
      damping: 15,
      duration: 0.6,
      ease: "easeOut",
      delay,
    }}
    className="group relative p-6 bg-white/30 backdrop-blur-2xl border border-white/40 
               rounded-2xl shadow-md overflow-hidden hover:bg-[#097c75] 
               transform-gpu will-change-transform text-center"
    style={{ backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased" }}
  >
    {/* Halo animé derrière */}
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: [0.9, 1.1, 0.9] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute top-6 left-6 w-12 h-12 bg-[#097c75]/20 blur-xl rounded-full"
    />

    <div className="relative z-10 text-gray-700 group-hover:text-white">
      <p className="italic mb-4">“{text}”</p>
      <p className="text-sm font-semibold">{name}</p>
      <p className="text-xs">{role}</p>
    </div>
  </motion.div>
);

export default TestimonialCard;
