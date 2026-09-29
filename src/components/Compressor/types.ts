// Fichier importé mais pas encore compressé
export type StagedFile = {
  id: string;          // Identifiant unique
  name: string;        // Nom du fichier
  previewUrl: string;  // ✅ URL temporaire pour afficher l’image
  size: number;        // Taille en octets
  file: File;          // ✅ Fichier original
  status?: "pending" | "compressing" | "done"; // ⚡ état du fichier
  progress?: number; // ⚡ progression en %
};

// Résultat d'une compression
export type CompressedResult = {
  original: string;          // URL de l’image originale
  originalSize: number;      // Taille originale
  compressed: string | null; // URL de l’image compressée
  compressedSize?: number;   // Taille compressée
  progress: number;          // Progression en %
};
