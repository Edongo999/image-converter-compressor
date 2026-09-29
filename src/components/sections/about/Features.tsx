import React from "react";
import { Users, Globe, Rocket, Shield } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { useTranslation } from "react-i18next";

const Features: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    { icon: Users, title: t("features.accessible.title"), desc: t("features.accessible.desc") },
    { icon: Globe, title: t("features.available.title"), desc: t("features.available.desc") },
    { icon: Rocket, title: t("features.fast.title"), desc: t("features.fast.desc") },
    { icon: Shield, title: t("features.secure.title"), desc: t("features.secure.desc") }
  ];

  return (
    <section className="mt-12">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 
                   justify-items-center text-center"
      >
        {features.map((item, i) => (
          <FeatureCard
            key={i}
            icon={item.icon}
            title={item.title}
            desc={item.desc}
            delay={0.2 + i * 0.2} // ✅ cascade douce
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
