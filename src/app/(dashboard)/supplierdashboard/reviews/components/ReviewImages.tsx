// reviews/components/ReviewImages.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageLightbox } from "./ImageLightbox";

export function ReviewImages({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!images.length) return null;

  return (
    <>
      <div className="mt-3 flex gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActiveIndex(i)}
            className="relative h-14 w-14 overflow-hidden rounded-lg border border-slate-100 bg-slate-50 transition hover:border-indigo-200"
          >
            <Image
              src={src}
              alt={`Review image ${i + 1}`}
              fill
              sizes="56px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
      <ImageLightbox
        images={images}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}