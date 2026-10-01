"use client";
import { useState } from "react";
import AddProductModal from "./AddProductModal";
import Pagination from "./Pagination";
import ProductsHeader from "./ProductsHeader";
import ProductsTable from "./ProductsTable";
import ProductsToolbar from "./ProductsToolbar";
import ProductStats from "./ProductStats";
import { exportCsv } from "./exportCsv";
import { useProducts } from "./useProducts";

export default function ProductsPage() {
	const p = useProducts();
	const [adding, setAdding] = useState(false);

	return (
		<div className="space-y-6 p-6">
			<ProductsHeader onAdd={() => setAdding(true)} />
			<ProductStats stats={p.stats} />
			<section className="rounded-xl border border-gray-200 bg-white">
				<ProductsToolbar
					filters={p.filters}
					categories={p.categories}
					onChange={p.updateFilters}
					onExport={() => exportCsv(p.filtered)}
				/>
				<ProductsTable rows={p.rows} onStatus={p.setStatus} onDelete={p.remove} />
				<Pagination {...p.pagination} />
			</section>
			{adding && <AddProductModal onClose={() => setAdding(false)} onAdd={p.add} />}
		</div>
	);
}
