"use client";

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';

/* ------------------------------------------------------------------ */
/* Inventory Icons (Dashboard এর উপর নির্ভর না করে সরাসরি এখানে যুক্ত)   */
/* ------------------------------------------------------------------ */
const Icons = {
  ShoppingBag: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  ),
  Plus: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  ),
  Search: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  TrendingUp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
  ),
  AlertTriangle: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
  ),
};

interface InventoryPanelProps {
  products: Product[];
  onAddProduct: () => void;
  onDeleteProduct: (id: string) => void;
}

const CATEGORIES = ['Electronics', 'Accessories', 'Audio'];

export const InventoryPanel: React.FC<InventoryPanelProps> = ({
  products,
  onAddProduct,
  onDeleteProduct,
}) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState<'All' | Product['status']>('All');
  const [sort, setSort] = useState('default');

  const stats = useMemo(() => {
    const total = products.length;
    const inStock = products.filter((p) => p.status === 'In Stock').length;
    const lowStock = products.filter((p) => p.status === 'Low Stock').length;
    const outOfStock = products.filter((p) => p.status === 'Out of Stock').length;
    return { total, inStock, lowStock, outOfStock };
  }, [products]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
      );
    }

    if (category !== 'All') {
      result = result.filter((p) => p.category === category);
    }

    if (status !== 'All') {
      result = result.filter((p) => p.status === status);
    }

    switch (sort) {
      case 'stock-asc':
        result.sort((a, b) => a.stock - b.stock);
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'sales-desc':
        result.sort((a, b) => b.salesCount - a.salesCount);
        break;
      default:
        break;
    }

    return result;
  }, [products, search, category, status, sort]);

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Products</span>
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Icons.ShoppingBag className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 text-2xl font-bold text-slate-900">{stats.total}</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">In Stock</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Icons.TrendingUp className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 text-2xl font-bold text-slate-900">{stats.inStock}</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Low Stock</span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Icons.AlertTriangle className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 text-2xl font-bold text-amber-600">{stats.lowStock}</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Out of Stock</span>
            <span className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <Icons.AlertTriangle className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-4 text-2xl font-bold text-rose-600">{stats.outOfStock}</div>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Inventory</h2>
          <p className="text-xs text-slate-500">Manage stock levels, pricing, and catalog details</p>
        </div>
        <button
          onClick={onAddProduct}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          <Icons.Plus className="w-4 h-4" />
          <span>Add New Item</span>
        </button>
      </div>

      {/* Table + filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-3 items-center">
          <div className="relative w-full sm:w-64">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search product or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white text-xs rounded-lg border border-slate-200 focus:border-indigo-500 focus:outline-none transition-all"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-600 font-medium focus:outline-none"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'All' | Product['status'])}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-600 font-medium focus:outline-none"
          >
            <option value="All">All Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-600 font-medium focus:outline-none"
          >
            <option value="default">Default Order</option>
            <option value="stock-asc">Stock: Low to High</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="sales-desc">Best Selling</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
                <th className="py-3.5 px-5">Product Details</th>
                <th className="py-3.5 px-5">SKU</th>
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">Price</th>
                <th className="py-3.5 px-5">Stock</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-slate-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800 block">{product.name}</span>
                        <span className="text-[10px] text-slate-400">{product.salesCount} total sales</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-slate-500 font-mono">{product.sku}</td>
                  <td className="py-3.5 px-5 text-slate-600">{product.category}</td>
                  <td className="py-3.5 px-5 font-semibold text-slate-800">${product.price.toFixed(2)}</td>
                  <td className="py-3.5 px-5 font-medium">{product.stock} units</td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        product.status === 'In Stock'
                          ? 'bg-emerald-50 text-emerald-700'
                          : product.status === 'Low Stock'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-slate-400 hover:text-indigo-600 font-medium p-1 transition-colors">
                        Edit
                      </button>
                      <button
                        onClick={() => onDeleteProduct(product.id)}
                        className="text-slate-400 hover:text-rose-600 font-medium p-1 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400 text-xs">
                    No products match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};