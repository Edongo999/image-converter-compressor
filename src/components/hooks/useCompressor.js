import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";
import jsPDF from "jspdf";
export const useCompressor = () => {
    // États principaux
    const [stagedFiles, setStagedFiles] = useState([]);
    const [results, setResults] = useState([]);
    const [quality, setQuality] = useState(70);
    const [outputFormat, setOutputFormat] = useState("webp");
    // États UI
    const [successToast, setSuccessToast] = useState(false);
    const [errorToast, setErrorToast] = useState(false);
    const [isZipping, setIsZipping] = useState(false);
    // Formatage taille
    const formatSize = (size) => (size / 1024).toFixed(2) + " Ko";
    // Calcul réduction
    const calcReduction = (original, compressed) => {
        if (!original || !compressed)
            return "N/A";
        const reduction = 100 - (compressed / original) * 100;
        return reduction.toFixed(1) + "%";
    };
    // Import fichiers
    const handleFilesSelected = (files) => {
        if (!files)
            return;
        const arr = Array.from(files);
        const currentCount = stagedFiles.length;
        if (currentCount + arr.length > 10) {
            setErrorToast(true);
            return;
        }
        const newStaged = arr.map((file, idx) => ({
            id: `${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 7)}`,
            name: file.name,
            previewUrl: URL.createObjectURL(file),
            size: file.size,
            file,
            status: "pending",
            progress: 0,
        }));
        setStagedFiles((prev) => [...prev, ...newStaged]);
    };
    // Compression d’un fichier
    const compressStagedFile = async (id) => {
        const staged = stagedFiles.find((s) => s.id === id);
        if (!staged)
            return;
        // passe en "compressing"
        setStagedFiles((prev) => prev.map((s) => (s.id === id ? { ...s, status: "compressing", progress: 0 } : s)));
        try {
            let compressedFile;
            let compressedUrl;
            if (outputFormat === "pdf") {
                const img = new Image();
                img.src = staged.previewUrl;
                await new Promise((resolve) => {
                    img.onload = resolve;
                });
                const pdf = new jsPDF({
                    orientation: img.width > img.height ? "landscape" : "portrait",
                    unit: "px",
                    format: [img.width, img.height],
                });
                pdf.addImage(img, "JPEG", 0, 0, img.width, img.height);
                compressedFile = pdf.output("blob");
                compressedUrl = URL.createObjectURL(compressedFile);
            }
            else {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1200,
                    initialQuality: quality / 100,
                    fileType: outputFormat === "original" ? staged.file.type : `image/${outputFormat}`,
                    useWebWorker: true,
                    onProgress: (p) => {
                        // mise à jour de la progression dans stagedFiles
                        setStagedFiles((prev) => prev.map((s) => (s.id === id ? { ...s, progress: p } : s)));
                    },
                };
                const file = await imageCompression(staged.file, options);
                compressedFile = file;
                compressedUrl = URL.createObjectURL(file);
            }
            // une fois terminé → ajouter dans results
            setResults((prev) => [
                ...prev,
                {
                    original: staged.previewUrl,
                    originalSize: staged.size,
                    compressed: compressedUrl,
                    compressedSize: compressedFile.size,
                    progress: 100,
                },
            ]);
            // retirer du haut
            setStagedFiles((prev) => prev.filter((s) => s.id !== id));
            URL.revokeObjectURL(staged.previewUrl);
        }
        catch (err) {
            console.error("Erreur de compression:", err);
        }
    };
    // Compression de tous les fichiers
    const compressAllStaged = async () => {
        for (const id of stagedFiles.map((s) => s.id)) {
            await compressStagedFile(id);
        }
    };
    // Annulation d’un fichier
    const cancelStagedFile = (id) => {
        setStagedFiles((prev) => {
            const toRemove = prev.find((s) => s.id === id);
            if (toRemove)
                URL.revokeObjectURL(toRemove.previewUrl);
            return prev.filter((s) => s.id !== id);
        });
    };
    // Annulation de tous les fichiers
    const cancelAllStaged = () => {
        stagedFiles.forEach((s) => URL.revokeObjectURL(s.previewUrl));
        setStagedFiles([]);
    };
    // Téléchargement ZIP
    const downloadAllAsZip = async () => {
        setIsZipping(true);
        try {
            const zip = new JSZip();
            for (const [idx, res] of results.entries()) {
                if (res.compressed) {
                    const ext = outputFormat === "original" ? "jpg" : outputFormat;
                    const blob = await fetch(res.compressed).then((r) => r.blob());
                    zip.file(`compressed-${idx}.${ext}`, blob);
                }
            }
            const content = await zip.generateAsync({ type: "blob" });
            await new Promise((resolve) => setTimeout(resolve, 3000));
            const url = URL.createObjectURL(content);
            const a = document.createElement("a");
            a.href = url;
            a.download = "compressed-images.zip";
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        }
        catch (err) {
            console.error("Erreur ZIP:", err);
        }
        finally {
            setIsZipping(false);
        }
    };
    // Nettoyage des URLs
    useEffect(() => {
        return () => {
            stagedFiles.forEach((s) => URL.revokeObjectURL(s.previewUrl));
        };
    }, []);
    // Vérifie si au moins une image est compressée
    const anyCompressed = results.some((r) => r.compressed);
    // Reset
    const resetAll = () => {
        stagedFiles.forEach((s) => URL.revokeObjectURL(s.previewUrl));
        setStagedFiles([]);
        setResults([]);
        setQuality(70);
        setOutputFormat("webp");
        setSuccessToast(false);
        setErrorToast(false);
    };
    return {
        stagedFiles,
        setStagedFiles,
        results,
        setResults,
        quality,
        setQuality,
        outputFormat,
        setOutputFormat,
        successToast,
        setSuccessToast,
        errorToast,
        setErrorToast,
        isZipping,
        formatSize,
        calcReduction,
        handleFilesSelected,
        compressStagedFile,
        compressAllStaged,
        cancelStagedFile,
        cancelAllStaged,
        downloadAllAsZip,
        anyCompressed,
        resetAll,
    };
};
