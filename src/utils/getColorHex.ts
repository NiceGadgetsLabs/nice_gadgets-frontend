import { COLOR_HEX } from '../constants/colors';

export const getColorHex = (color: string): string => {
  const normalizedColor = color.replace(/[-_\s]/g, '');

  return COLOR_HEX[normalizedColor] ?? color;
};
