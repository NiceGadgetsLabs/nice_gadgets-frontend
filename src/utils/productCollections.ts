import { type Product } from '../types/Products';
import { sortProducts } from './sortProducts';

const getModelKey = (product: Product): string =>
  product.itemId.replace(/-(\d+(gb|tb|mm)).*$/i, '');

const dedupeByModel = (products: Product[]): Product[] => {
  const usedModels = new Set<string>();

  return products.filter((product) => {
    const model = getModelKey(product);

    if (usedModels.has(model)) {
      return false;
    }

    usedModels.add(model);

    return true;
  });
};

export const getRecommendedProducts = (
  products: Product[],
  current: Product | null,
  limit = 20,
): Product[] => {
  if (!current) {
    return [];
  }

  const sorted = products
    .filter((product) => product.category !== current.category)
    .sort(
      (first, second) =>
        Math.abs(first.year - current.year) - Math.abs(second.year - current.year) ||
        first.price - second.price,
    );

  return dedupeByModel(sorted).slice(0, limit);
};

export const getNewestProducts = (products: Product[], limit = 20): Product[] => {
  const sorted = sortProducts(products, 'newest').filter((product) => Number(product.year) >= 2020);

  return dedupeByModel(sorted).slice(0, limit);
};

export const getHotPriceProducts = (products: Product[], limit = 20): Product[] => {
  const sorted = sortProducts(products, 'discountDesc');

  return dedupeByModel(sorted).slice(0, limit);
};
