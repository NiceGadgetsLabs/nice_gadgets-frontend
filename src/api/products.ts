import { client } from '../utils/fetchClient';
import type { Product } from '../types/Products';
import type { ProductDetails } from '../types/ProductDetails';
import type { Category } from '../types/Category';

const load = () => client.get<Product[]>('/products');

const loadByCategory = (category: Category) => client.get<ProductDetails[]>(`/${category}`);

export const productsApi = {
  load,
  loadByCategory,
};
