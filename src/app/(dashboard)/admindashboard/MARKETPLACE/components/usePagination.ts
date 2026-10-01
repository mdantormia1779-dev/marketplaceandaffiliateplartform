"use client";
import { useMemo, useState } from "react";

export const PAGE_SIZE_OPTIONS = [10, 25, 50];

export function usePagination<T>(items: T[]) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const rows = useMemo(
    () => items.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [items, currentPage, pageSize]
  );

  const changePageSize = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  return {
    rows,
    page: currentPage,
    pageCount,
    total: items.length,
    pageSize,
    setPage,
    setPageSize: changePageSize,
  };
}