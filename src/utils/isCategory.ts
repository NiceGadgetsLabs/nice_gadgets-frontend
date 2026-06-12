import { CATEGORIES } from '../constants/categories';
import type { Category } from '../types/Category';

export const isCategory = (value: string | undefined): value is Category => {
  return CATEGORIES.includes(value as Category);
};
