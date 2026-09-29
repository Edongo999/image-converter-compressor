import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
export const useProgressMessages = (visible, progress) => {
    const { t } = useTranslation();
    const messages = [
        { text: t("progressMessages.wait"), color: "text-gray-800" },
        { text: t("progressMessages.compressing"), color: "text-orange-600" },
        { text: t("progressMessages.finalizing"), color: "text-green-600" },
    ];
    const [currentMessage, setCurrentMessage] = useState(0);
    useEffect(() => {
        if (!visible)
            return;
        // ✅ Reset différé pour éviter le setState synchrone
        const reset = requestAnimationFrame(() => setCurrentMessage(0));
        // ✅ Durée adaptative selon la vitesse
        const getDuration = () => {
            if (progress < 30)
                return 3000;
            if (progress < 80)
                return 2000;
            return 1500;
        };
        const interval = setInterval(() => {
            setCurrentMessage((prev) => prev < messages.length - 1 ? prev + 1 : prev);
        }, getDuration());
        return () => {
            cancelAnimationFrame(reset);
            clearInterval(interval);
        };
    }, [visible, progress]);
    return messages[currentMessage];
};
