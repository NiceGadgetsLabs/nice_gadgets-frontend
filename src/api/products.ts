import { client } from '../utils/fetchClient';
import type { Product } from '../types/Products';

const load = () => client.get<Product[]>('/products');

export const productsApi = {
  load,
};
