import { useCallback, useEffect, type FC } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { ProductList } from '../../organisms/ProductList/ProductList';
import { SelectField, type SelectOption } from '../../molecules/SelectField/SelectField';
import { Pagination } from '../../molecules/Pagination/Pagination';
import { sortProducts } from '../../../utils/sortProducts';
import type { Product } from '../../../types/Products';
import './ProductCatalog.scss';

const sortOptions: SelectOption[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'discountDesc', label: 'Highest discount' },
  { value: 'priceLowToHigh', label: 'Price: Low to High' },
  { value: 'priceHighToLow', label: 'Price: High to Low' },
];

const pageSizeOptions: SelectOption[] = [
  { value: '16', label: '16' },
  { value: '24', label: '24' },
  { value: '32', label: '32' },
];

const getCategoryTitle = (categoryId?: string) => {
  switch (categoryId) {
    case 'phones':
      return 'Mobile phones';
    case 'tablets':
      return 'Tablets';
    case 'accessories':
      return 'Accessories';
    default:
      return 'All products';
  }
};

interface Props {
  products: Product[];
}

export const ProductCatalog: FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();
  const sortBy = searchParams.get('sort') || 'newest';
  const itemsPerPage = parseInt(searchParams.get('perPage') || '16', 10);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);

        Object.entries(updates).forEach(([key, value]) => {
          if (value === null) {
            newParams.delete(key);
          } else {
            newParams.set(key, value);
          }
        });

        return newParams;
      });
    },
    [setSearchParams],
  );

  const handleSortChange = (value: string) => {
    updateParams({ sort: value, page: null });
  };

  const handlePerPageChange = (value: string) => {
    updateParams({ perPage: value, page: null });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: page.toString() });
  };

  const sortedProducts = sortProducts(products, sortBy);
  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const safePage = Math.min(currentPage, totalPages || 1);

  useEffect(() => {
    if (totalPages > 0 && safePage !== currentPage) {
      updateParams({ page: safePage.toString() });
    }
  }, [safePage, currentPage, totalPages, updateParams]);

  const startIndex = (safePage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <header className="catalog__header">
        <div className="catalog__breadcrumbs">BreadCrumbs</div>
        <h1>{getCategoryTitle(category)}</h1>
        <p className="catalog__models-count">{totalItems} models</p>
      </header>

      <div className="catalog__selects">
        <SelectField
          label="Sort by"
          options={sortOptions}
          value={sortBy}
          onValueChange={handleSortChange}
          className="catalog__select-sort"
        />
        <SelectField
          label="Items on page"
          options={pageSizeOptions}
          value={searchParams.get('perPage') || '16'}
          onValueChange={handlePerPageChange}
          className="catalog__select-pages"
        />
      </div>

      <ProductList products={paginatedProducts} />

      <div className="catalog__pagination">
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
