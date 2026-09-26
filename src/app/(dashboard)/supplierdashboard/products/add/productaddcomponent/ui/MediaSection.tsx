"use client";

import { ImagePlus, X } from "lucide-react";
import { Card } from "./Primitives";
import { MAX_IMAGES } from "../types";

export default function MediaSection({
  images,
  mediaError,
  onAdd,
  onRemove,
}: {
  images: string[];
  mediaError: string;
  onAdd: (files: FileList | File[]) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <Card title="Media" description={`Add up to ${MAX_IMAGES} images. The first image becomes your main product photo.`}>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,220px))] gap-4">
        {images.map((src, i) => (
          <div
            key={src.slice(-32) + i}
            className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`Product image ${i + 1}`} className="h-full w-full object-cover" />
            {i === 0 && (
              <span className="absolute left-2 top-2 rounded bg-slate-900/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
                Main
              </span>
            )}
            <button
              type="button"
              onClick={() => onRemove(i)}
              aria-label={`Remove image ${i + 1}`}
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-slate-700 opacity-0 shadow transition hover:text-red-600 focus:opacity-100 group-hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {images.length < MAX_IMAGES && (
          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              onAdd(e.dataTransfer.files);
            }}
            className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 text-slate-500 transition hover:border-blue-400 hover:bg-blue-50/40 focus-within:ring-2 focus-within:ring-blue-200"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
              <ImagePlus className="h-4 w-4" />
            </span>
            <span className="text-[11px]">Add image</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              className="sr-only"
              onChange={(e) => {
                if (e.target.files) onAdd(e.target.files);
                e.target.value = "";
              }}
            />
          </label>
        )}
      </div>
      {mediaError && <p className="mt-3 text-[11px] text-red-600">{mediaError}</p>}
      <p className="mt-4 text-[11px] text-slate-400">
        Recommended: square JPG or PNG, at least 1000×1000px. {images.length}/{MAX_IMAGES} added.
      </p>
    </Card>
  );
}