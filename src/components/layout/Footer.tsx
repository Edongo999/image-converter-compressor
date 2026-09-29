import React, { useEffect, useState } from "react";
import {
  FaRocket,
  FaLock,
  FaGlobe,
  FaMagic,
  FaEnvelope,
  FaLaptopCode,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  const messages = [
    { text: t("footer.messages.fast"), icon: <FaRocket /> },
    { text: t("footer.messages.optimize"), icon: <FaMagic /> },
    { text: t("footer.messages.confidentiality"), icon: <FaLock /> },
    { text: t("footer.messages.accessible"), icon: <FaGlobe /> },
    { text: t("footer.messages.contact"), icon: <FaEnvelope /> },
    { text: t("footer.messages.customDev"), icon: <FaLaptopCode /> },
    { text: t("footer.messages.ally"), icon: <FaMagic /> },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <footer className="w-full bg-gradient-to-r from-[#097c75] to-orange-500 text-white shadow-inner mt-0">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* ✅ Bloc marketing dynamique */}
        <div className="flex items-center gap-2 font-semibold animate-pulse">
          {messages[index].icon}
          <span>{messages[index].text}</span>
        </div>

        {/* ✅ Attribution + lien portfolio */}
        <div className="text-center sm:text-right">
          <p className="text-sm">{t("footer.attribution")}</p>
          <a
            href="https://portfolio-frank-landry.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-yellow-300 text-sm font-medium"
          >
            {t("footer.link")}
          </a>
        </div>
      </div>

      {/* ✅ Copyright */}
      <div className="text-center text-xs py-3 bg-black/20">
        {t("footer.copyright")}
      </div>
    </footer>
  );
};

export default Footer;
