"use client";

import { useState } from "react";
import {
  X,
  PackagePlus,
  ImagePlus,
  Tag,
  DollarSign,
  Boxes,
  FileText,
} from "lucide-react";

export type ProductData = {
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
};

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onProductAdded: (product: ProductData) => void;
}

export default function AddProductModal({
  open,
  onClose,
  onProductAdded,
}: AddProductModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [imageName, setImageName] = useState("");

  if (!open) {
    return null;
  }

  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setDescription("");
    setImageName("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !category || !price || !stock) {
      return;
    }

    const product: ProductData = {
      name: name.trim(),
      category,
      price: Number(price),
      stock: Number(stock),
      description: description.trim(),
    };

    onProductAdded(product);

    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <PackagePlus className="h-5 w-5" />
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                Add Product
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Add a new product to your store.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 p-6">
            {/* Product Name */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Product name
              </label>

              <div className="relative">
                <PackagePlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product name"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </div>
            </div>

            {/* Category + Price */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Category
                </label>

                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Price
                </label>

                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Stock */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Stock quantity
              </label>

              <div className="relative">
                <Boxes className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Enter stock quantity"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Product image
              </label>

              <label className="flex h-24 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 transition hover:border-indigo-400 hover:bg-indigo-50/30">
                <ImagePlus className="mb-1 h-6 w-6 text-slate-400" />

                <span className="text-xs font-medium text-slate-600">
                  {imageName || "Click to upload product image"}
                </span>

                <span className="mt-0.5 text-[10px] text-slate-400">
                  PNG, JPG or WEBP
                </span>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setImageName(file.name);
                    }
                  }}
                />
              </label>
            </div>

            {/* Description */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Description
              </label>

              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a short product description..."
                  rows={3}
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white pl-10 pr-3 pt-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
            >
              <PackagePlus className="h-4 w-4" />
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}