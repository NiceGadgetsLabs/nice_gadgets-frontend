import type { Product } from '../types/Products';

const API_URL = './api';

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export function getProductAll(): Promise<Product[]> {
  return fetch(API_URL + '/products.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .then((data) => wait(600).then(() => data));
}
