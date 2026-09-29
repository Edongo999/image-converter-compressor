import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
const PdfPreview = ({ url }) => {
    const [thumbnail, setThumbnail] = useState(null);
    const { t } = useTranslation();
    useEffect(() => {
        const renderPdfThumbnail = async () => {
            try {
                const canvas = document.createElement("canvas");
                setThumbnail(canvas.toDataURL()); // image base64
            }
            catch (err) {
                console.error("Erreur rendu PDF:", err);
            }
        };
        renderPdfThumbnail();
    }, [url]);
    return thumbnail ? (_jsx("img", { src: thumbnail, alt: t("pdfPreview.alt"), className: "w-[300px] h-[250px] object-cover rounded-xl shadow-lg mx-auto" })) : (_jsx("p", { className: "text-center text-gray-500", children: t("pdfPreview.loading") }));
};
export default PdfPreview;
