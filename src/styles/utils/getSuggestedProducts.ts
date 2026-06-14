export const getSuggestedProducts = <T>(products: T[]) => {
  return [...products].sort(() => Math.random() - 0.5);
};
