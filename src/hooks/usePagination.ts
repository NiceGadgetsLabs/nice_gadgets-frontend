import { useState } from 'react';

export function usePagination<T>(items: T[], itemsPerPage: number | 'all') {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = items.length;
  const totalPages = itemsPerPage === 'all' ? 1 : Math.ceil(totalItems / itemsPerPage);

  const safePage = Math.min(currentPage, totalPages || 1);
  if (safePage !== currentPage) setCurrentPage(safePage);

  const start = itemsPerPage === 'all' ? 0 : (safePage - 1) * itemsPerPage;
  const paginatedItems = itemsPerPage === 'all' ? items : items.slice(start, start + itemsPerPage);

  return {
    paginatedItems,
    currentPage: safePage,
    totalPages,
    setPage: (page: number) => setCurrentPage(Math.max(1, Math.min(page, totalPages))),
    nextPage: () => setCurrentPage((page) => Math.min(page + 1, totalPages)),
    prevPage: () => setCurrentPage((page) => Math.max(page - 1, 1)),
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
  };
}
