type Category = 'phones' | 'tablets' | 'accessories';

interface Props {
  category: Category;
}

export const CatalogPage = ({ category }: Props) => {
  return <h1>{`${category.charAt(0).toUpperCase() + category.slice(1)}Page`}</h1>;
};
