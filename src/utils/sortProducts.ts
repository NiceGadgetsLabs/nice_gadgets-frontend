import { type Product } from '../types/Products';

export function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'newest':
      sorted.sort((productA, productB) => (productB.year ?? 0) - (productA.year ?? 0));
      break;

    case 'priceLowToHigh':
      sorted.sort((productA, productB) => (productA.price ?? 0) - (productB.price ?? 0));
      break;

    case 'priceHighToLow':
      sorted.sort((productA, productB) => (productB.price ?? 0) - (productA.price ?? 0));
      break;

    case 'discountDesc': {
      const getDiscountPercent = (product: Product): number => {
        const fullPrice = product.fullPrice ?? 0;
        const currentPrice = product.price ?? 0;

        if (fullPrice > currentPrice) {
          return ((fullPrice - currentPrice) / fullPrice) * 100;
        }
        return 0;
      };

      sorted.sort(
        (productA, productB) => getDiscountPercent(productB) - getDiscountPercent(productA),
      );
      break;
    }

    default:
      break;
  }

  return sorted;
}
