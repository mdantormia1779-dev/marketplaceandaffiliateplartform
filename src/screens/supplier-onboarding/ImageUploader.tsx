import React from 'react';
import { ImagePlus, X } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  preview: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  recommendedText: string;
  isBanner?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  preview,
  inputRef,
  onFileChange,
  onRemove,
  recommendedText,
  isBanner = false,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
        {label}
      </label>

      <input
        type="file"
        ref={inputRef}
        onChange={onFileChange}
        accept="image/png, image/jpeg"
        className="hidden"
      />

      <div
        onClick={() => inputRef.current?.click()}
        className="relative border-2 border-dashed border-slate-200/90 rounded-2xl p-6 bg-[#F8FAFC]/50 hover:bg-slate-50 text-center space-y-3 transition-colors cursor-pointer group overflow-hidden min-h-[150px] flex flex-col items-center justify-center"
      >
        {preview ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <img
              src={preview}
              alt={label}
              className={`${isBanner ? 'w-full h-24' : 'w-20 h-20'} object-cover rounded-xl shadow-xs`}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ImagePlus className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700">
                Drag & drop or <span className="text-blue-600 hover:underline">browse</span>
              </p>
              <p className="text-[11px] font-medium text-slate-400 mt-1">
                {recommendedText}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};