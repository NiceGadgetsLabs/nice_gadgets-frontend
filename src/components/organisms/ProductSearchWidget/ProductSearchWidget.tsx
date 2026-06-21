import React, { useMemo, useState } from 'react';
import SearchModal, { type SearchResults } from '../SearchModal/SearchModal';
import { Icon } from '../../atoms/Icon/Icon';
import { useDebounce } from '../../../hooks/useDebounce';
import { useSearchShortcut } from '../../../hooks/useSearchShortcut';
import { useProducts } from '../../../hooks/useProducts';
import type { Product } from '../../../types/Products';
import type { Category } from '../../../types/Category';

const EMPTY_RESULTS: SearchResults = {
  phones: { items: [], total: 0 },
  tablets: { items: [], total: 0 },
  accessories: { items: [], total: 0 },
};

const buildResults = (query: string, allProducts: Product[]): SearchResults => {
  const normalizedQuery = query.trim().toLowerCase();
  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

  if (tokens.length === 0) return EMPTY_RESULTS;

  const matched = allProducts.filter((product) => {
    const name = product.name.toLowerCase();
    return tokens.every((token) => name.includes(token));
  });

  const rank = (product: Product) =>
    product.name.toLowerCase().startsWith(normalizedQuery) ? 0 : 1;

  const group = (category: Category) => {
    const items = matched
      .filter((product) => product.category === category)
      .sort((a, b) => rank(a) - rank(b) || a.name.length - b.name.length || a.price - b.price);

    return { items, total: items.length };
  };

  return {
    phones: group('phones'),
    tablets: group('tablets'),
    accessories: group('accessories'),
  };
};

interface ProductSearchWidgetProps {
  onOpen?: () => void;
}

export const ProductSearchWidget: React.FC<ProductSearchWidgetProps> = ({ onOpen }) => {
  const { products, isLoading } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [rawQuery, setRawQuery] = useState('');

  const debouncedQuery = useDebounce(rawQuery, 350);

  const openSearch = () => {
    onOpen?.();
    setIsOpen(true);
  };

  useSearchShortcut(openSearch);

  const effectiveQuery = rawQuery.trim() ? debouncedQuery : '';
  const results = useMemo(() => buildResults(effectiveQuery, products), [effectiveQuery, products]);

  const handleClose = () => {
    setIsOpen(false);
    setRawQuery('');
  };

  return (
    <>
      <button
        type="button"
        className="header__actions-link header__actions-link--search"
        aria-label="Search"
        title="Search (Ctrl+K)"
        onClick={openSearch}
      >
        <Icon type="search" />
      </button>

      <SearchModal
        isOpen={isOpen}
        onClose={handleClose}
        searchQuery={rawQuery}
        onSearchQueryChange={setRawQuery}
        results={results}
        isLoading={isLoading && Boolean(rawQuery.trim())}
      />
    </>
  );
};
