/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { FocusTrap } from 'focus-trap-react';
import SearchInput from '../../molecules/SearchInput/SearchInput';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { type Product } from '../../../types/Products';
import './SearchModal.scss';

export interface CategoryResult {
  items: Product[];
  total: number;
}

export interface SearchResults {
  phones: CategoryResult;
  tablets: CategoryResult;
  accessories: CategoryResult;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  results: SearchResults;
  isLoading: boolean;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchQueryChange,
  results,
  isLoading,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const hasQuery = Boolean(searchQuery.trim());
  const hasResults =
    results.phones.total > 0 || results.tablets.total > 0 || results.accessories.total > 0;

  const showEmptyPrompt = !isLoading && !hasQuery;
  const showNoResults = !isLoading && hasQuery && !hasResults;

  return ReactDOM.createPortal(
    <div className="search-modal__backdrop" onClick={handleBackdropClick}>
      <FocusTrap
        active={isOpen}
        focusTrapOptions={{
          escapeDeactivates: false,
          clickOutsideDeactivates: false,
          allowOutsideClick: true,
        }}
      >
        <div
          className="search-modal__container"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
        >
          <div className="search-modal__header">
            <SearchInput
              value={searchQuery}
              onChange={onSearchQueryChange}
              placeholder="Search products…"
            />

            <Button
              type="button"
              variant="icon"
              className="search-modal__close"
              aria-label="Close search"
              onClick={onClose}
            >
              <Icon type="close" width={16} height={16} />
            </Button>
          </div>

          <div className="search-modal__results">
            {isLoading && (
              <div className="search-modal__state">
                <span className="search-modal__spinner" />
                <span>Searching…</span>
              </div>
            )}

            {showEmptyPrompt && (
              <div className="search-modal__state">
                <span>Start typing to search phones, tablets and accessories.</span>
              </div>
            )}

            {showNoResults && (
              <div className="search-modal__state">
                <span>
                  No results for “<span className="search-modal__state-query">{searchQuery}</span>”.
                </span>
              </div>
            )}

            {!isLoading && hasResults && (
              <div className="search-modal__categories">
                {results.phones.total > 0 && (
                  <CategorySection title="Phones" result={results.phones} onSelect={onClose} />
                )}
                {results.tablets.total > 0 && (
                  <CategorySection title="Tablets" result={results.tablets} onSelect={onClose} />
                )}
                {results.accessories.total > 0 && (
                  <CategorySection
                    title="Accessories"
                    result={results.accessories}
                    onSelect={onClose}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </FocusTrap>
    </div>,
    document.body,
  );
};

interface CategorySectionProps {
  title: string;
  result: CategoryResult;
  onSelect: () => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, result, onSelect }) => (
  <section className="search-modal__category">
    <h3 className="search-modal__category-title">{`${title} (${result.total})`}</h3>

    <div className="search-modal__list">
      {result.items.map((product) => (
        <Link
          key={product.id}
          to={`/${product.category}/${product.itemId}`}
          className="search-modal__item"
          onClick={onSelect}
        >
          <img
            src={`/${product.image}`}
            alt={product.name}
            className="search-modal__thumb"
            decoding="async"
          />

          <div className="search-modal__info">
            <p className="search-modal__name">{product.name}</p>
            <p className="search-modal__price">${product.price}</p>
          </div>

          <Icon type="arrow-right" className="search-modal__arrow" width={16} height={16} />
        </Link>
      ))}
    </div>
  </section>
);

export default SearchModal;
