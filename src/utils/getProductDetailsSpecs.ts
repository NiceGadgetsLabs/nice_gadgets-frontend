import type { ProductDetails } from '../types/ProductDetails';
import { getValidSpecs } from './getValidSpecs';

export const getProductDetailsSpecs = (productDetails: ProductDetails) => {
  const { screen, resolution, processor, ram, camera, zoom, cell } = productDetails;

  return getValidSpecs([
    { title: 'Screen', value: screen },
    { title: 'Resolution', value: resolution },
    { title: 'Processor', value: processor },
    { title: 'RAM', value: ram },
    { title: 'Camera', value: camera },
    { title: 'Zoom', value: zoom },
    { title: 'Cell', value: cell.join(', ') },
  ]);
};
