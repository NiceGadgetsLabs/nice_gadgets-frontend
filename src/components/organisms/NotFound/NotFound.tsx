import { useEffect, type FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import NotFoundPageImage from '../../../assets/images/page-not-found.avif';
import NotFoundProductImage from '../../../assets/images/product-not-found.avif';
import './NotFound.scss';

export type NotFoundVariant = 'page' | 'product';

interface Props {
  variant?: NotFoundVariant;
}

const CONTENT: Record<NotFoundVariant, { image: string; subtitle: string }> = {
  page: { image: NotFoundPageImage, subtitle: 'Page not found' },
  product: { image: NotFoundProductImage, subtitle: 'Product not found' },
};

export const NotFound: FC<Props> = ({ variant = 'page' }) => {
  const { image, subtitle } = CONTENT[variant];

  useEffect(() => {
    document.title = subtitle;
  }, [subtitle]);

  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <img className="not-found__image" src={image} alt={subtitle} decoding="async" />
      <h2 className="not-found__subtitle">{subtitle}</h2>

      <Button asChild variant="ghost" className="not-found__button">
        <Link to="/">
          <Icon type="arrow-left" width="16px" height="16px" />
          <span>Go to home page</span>
        </Link>
      </Button>
    </div>
  );
};
