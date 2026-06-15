import { Link, useMatches, useParams } from 'react-router-dom';
import { Icon } from '../../atoms/Icon/Icon';
import './Breadcrumbs.scss';
import type { FC } from 'react';

type BreadcrumbHandle = {
  breadcrumb: string;
};

type Match = {
  pathname: string;
  handle?: BreadcrumbHandle;
};

interface Props {
  item?: string;
}

export const Breadcrumbs: FC<Props> = ({ item = undefined }) => {
  const matches = useMatches() as Match[];
  const { category } = useParams();

  const crumbs = matches.filter((match) => match.handle?.breadcrumb);

  const getLabel = (label: string) => {
    if (label === 'Category' && category) {
      return category.at(0)?.toUpperCase() + category.slice(1);
    }

    return label;
  };

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {crumbs.map((match, index) => {
        const isFirst = index === 0;
        const isLast = index === crumbs.length - 1;

        const content = isFirst ? <Icon type="home" /> : getLabel(match.handle?.breadcrumb ?? '');
        const displayContent = isLast && item ? item : content;

        return (
          <span key={match.pathname} className="breadcrumbs-item">
            {!isFirst && <Icon type="arrow-right" className="breadcrumbs-icon" />}

            {isLast ? (
              <span className="breadcrumbs-current">{displayContent}</span>
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
