// reviews/components/ImageLightbox.tsx
"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function ImageLightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: {
  images: string[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  if (activeIndex === null) return null;

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < images.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative rounded-xl bg-white p-3 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -right-3 -top-3 rounded-full bg-white p-1.5 text-slate-500 shadow hover:text-slate-700"
        >
          <X size={16} />
        </button>

        <div className="relative h-72 w-72 overflow-hidden rounded-lg bg-slate-100 sm:h-96 sm:w-96">
          <Image
            src={images[activeIndex]}
            alt={`Review image ${activeIndex + 1}`}
            fill
            sizes="(min-width: 640px) 384px, 288px"
            className="object-contain"
          />

          {hasPrev && (
            <button
              onClick={() => onNavigate(activeIndex - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-slate-600 shadow hover:bg-white"
            >
              <ChevronLeft size={16} />
            </button>
          )}

          {hasNext && (
            <button
              onClick={() => onNavigate(activeIndex + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-slate-600 shadow hover:bg-white"
            >
              <ChevronRight size={16} />
            </button>
          )}
        </div>

        {images.length > 1 && (
          <p className="mt-2 text-center text-xs text-slate-400">
            {activeIndex + 1} / {images.length}
          </p>
        )}
      </div>
    </div>
  );
}