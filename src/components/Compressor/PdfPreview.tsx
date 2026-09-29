import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  url: string;
};

const PdfPreview: React.FC<Props> = ({ url }) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const renderPdfThumbnail = async () => {
      try {
        const canvas = document.createElement("canvas");
        setThumbnail(canvas.toDataURL()); // image base64
      } catch (err) {
        console.error("Erreur rendu PDF:", err);
      }
    };

    renderPdfThumbnail();
  }, [url]);

  return thumbnail ? (
    <img
      src={thumbnail}
      alt={t("pdfPreview.alt")}
      className="w-[300px] h-[250px] object-cover rounded-xl shadow-lg mx-auto"
    />
  ) : (
    <p className="text-center text-gray-500">{t("pdfPreview.loading")}</p>
  );
};

export default PdfPreview;
