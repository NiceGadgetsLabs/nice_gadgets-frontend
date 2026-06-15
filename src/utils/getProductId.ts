export const getProductId = (namespaceId: string, capacity: string, color: string): string => {
  return `${namespaceId}-${capacity}-${color}`.toLowerCase().replace(/\s+/g, '-');
};
