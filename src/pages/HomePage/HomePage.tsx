import type { Product } from '../../types/Products';
import './HomePage.scss';
import { PictureSlider } from '../../components/organisms/PictureSlider/PicturesSlider';
import { ProductCards } from './components/ProductCards/ProductCards';
import { Categories } from './components/Categories/Categories';

type Props = {
  products: Product[];
  loading: boolean;
};

export const HomePage = ({ products }: Props) => {
  const newestProducts = [...products].sort((product1, product2) => product2.year - product1.year);

  return (
    <div className="home">
      <div className="container">
        <div className="home__content">
          <h1 className="home__sr-only">Product Catalog</h1>

          <h2 className="home__title">Welcome to Nice Gadgets store!</h2>

          <div className="home__mainContent">
            <PictureSlider />

            <ProductCards
              title="Brand new models"
              products={newestProducts}
              filterMode="only2022"
            />

            <Categories products={newestProducts} />

            <ProductCards title="Hot prices" products={newestProducts} filterMode="exclude2022" />
          </div>
        </div>
      </div>
    </div>
  );
};
