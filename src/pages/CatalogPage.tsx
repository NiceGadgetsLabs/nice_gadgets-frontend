import { useCallback, useEffect, type FC } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { CatalogLayout } from '../layouts/CatalogLayout/CatalogLayout';
import { ProductList } from '../components/organisms/ProductList/ProductList';
import { SelectField, type SelectOption } from '../components/molecules/SelectField/SelectField';
import { Pagination } from '../components/molecules/Pagination/Pagination';
import { ErrorState } from '../components/molecules/ErrorState/ErrorState';
import { useProducts } from '../hooks/useProducts';
import { sortProducts } from '../utils/sortProducts';
import { isCategory } from '../utils/isCategory';
import { notify } from '../utils/notify';
import { NotFoundPage } from './NotFoundPage';

const sortOptions: SelectOption[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'discountDesc', label: 'Highest discount' },
  { value: 'priceLowToHigh', label: 'Price: Low to High' },
  { value: 'priceHighToLow', label: 'Price: High to Low' },
];

const pageSizeOptions: SelectOption[] = [
  { value: '12', label: '12' },
  { value: '24', label: '24' },
  { value: '36', label: '36' },
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

export const CatalogPage: FC = () => {
  const { category } = useParams();
  const { products, errorMessage, isLoading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'newest';
  const itemsPerPage = parseInt(searchParams.get('perPage') || '12', 10);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    if (!category) return;
    document.title = category.at(0)?.toUpperCase() + category.slice(1);
  }, [category]);

  useEffect(() => {
    if (errorMessage) notify.error(errorMessage);
  }, [errorMessage]);

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

  const visibleProducts = products.filter((product) => product.category === category);
  const sortedProducts = sortProducts(visibleProducts, sortBy);
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

  if (!isCategory(category)) {
    return <NotFoundPage />;
  }

  if (errorMessage) {
    return <ErrorState />;
  }

  return (
    <CatalogLayout
      title={getCategoryTitle(category)}
      count={totalItems}
      controls={
        <>
          <SelectField
            label="Sort by"
            options={sortOptions}
            value={sortBy}
            onValueChange={handleSortChange}
            className="catalog__select-sort"
          />
          <SelectField
            label="Items per page"
            options={pageSizeOptions}
            value={searchParams.get('perPage') || '12'}
            onValueChange={handlePerPageChange}
            className="catalog__select-pages"
          />
        </>
      }
      list={
        <ProductList
          products={paginatedProducts}
          isLoading={isLoading}
          skeletonCount={itemsPerPage}
        />
      }
      pagination={
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      }
    />
  );
};
