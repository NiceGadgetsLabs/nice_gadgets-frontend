import { Link, useMatches, useParams } from 'react-router-dom';
import { Icon } from '../../atoms/Icon/Icon';
import { useProductDetails } from '../../../hooks/useProductDetails';
import './Breadcrumbs.scss';

type BreadcrumbHandle = {
  breadcrumb: string;
};

type Match = {
  pathname: string;
  handle?: BreadcrumbHandle;
};

export const Breadcrumbs = () => {
  const matches = useMatches() as Match[];
  const { category } = useParams();
  const { productDetails } = useProductDetails();

  const crumbs = matches.filter((match) => match.handle?.breadcrumb);

  const getLabel = (label: string) => {
    if (label === 'Category' && category) {
      return category;
    }

    if (label === 'Product') {
      return productDetails?.name ?? '...';
    }

    return label;
  };

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {crumbs.map((match, index) => {
        const isFirst = index === 0;
        const isLast = index === crumbs.length - 1;

        const content = isFirst ? <Icon type="home" /> : getLabel(match.handle?.breadcrumb ?? '');

        return (
          <span key={match.pathname} className="breadcrumbs-item">
            {!isFirst && <Icon type="arrow-right" />}

            {isLast ? (
              <span className="breadcrumbs-current">{content}</span>
            ) : (
              <Link to={match.pathname} className="breadcrumbs-link">
                {content}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};
