import React from "react";
import { AnimatePresence } from "framer-motion";
import { StagedFile } from "./types";
import StagedItem from "./StagedItem";

type Props = {
  stagedFiles: StagedFile[];
  onCompressOne: (id: string) => Promise<void>;
  onCancelOne: (id: string) => void;
  formatSize: (size: number) => string;
};

const StagingList: React.FC<Props> = ({
  stagedFiles,
  onCompressOne,
  onCancelOne,
  formatSize,
}) => {
  if (stagedFiles.length === 0) return null;

  return (
    <div className="w-full mb-10">
      {/* ✅ Liste des images uniquement */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
                        gap-x-8 md:gap-x-12 lg:gap-x-80 
                        gap-y-6 md:gap-y-10 lg:gap-y-12 
                        justify-items-center">
          <AnimatePresence>
            {stagedFiles.map((s) => (
              <StagedItem
                key={s.id}
                staged={s}
                onCompress={onCompressOne}
                onCancel={onCancelOne}
                formatSize={formatSize}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default StagingList;