import { useMemo, useState } from 'react';

export function usePagination<T>(items: T[], itemsPerPage: number | 'all') {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = items.length;
  const totalPages = itemsPerPage === 'all' ? 1 : Math.ceil(totalItems / itemsPerPage);

  const safePage = Math.min(currentPage, totalPages || 1);
  if (safePage !== currentPage) setCurrentPage(safePage);

  const paginatedItems = useMemo(() => {
    if (itemsPerPage === 'all') return items;
    const start = (safePage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, itemsPerPage, safePage]);

  return {
    paginatedItems,
    currentPage: safePage,
    totalPages,
    setPage: (page: number) => setCurrentPage(Math.max(1, Math.min(page, totalPages))),
    nextPage: () => setCurrentPage((p) => Math.min(p + 1, totalPages)),
    prevPage: () => setCurrentPage((p) => Math.max(p - 1, 1)),
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
  };
}
