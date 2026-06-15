import type { FC } from 'react';
import { Skeleton } from '../../atoms/Skeleton/Skeleton';
import './ProductCardSkeleton.scss';

export const ProductCardSkeleton: FC = () => {
  return (
    <article className="card card-skeleton" aria-hidden="true">
      <Skeleton className="card-skeleton__image" />

      <div className="card-skeleton__title">
        <Skeleton height={16} />
        <Skeleton height={16} width="66%" />
      </div>

      <Skeleton className="card-skeleton__price" height={22} width="45%" />

      <hr className="card__divider" />

      <div className="card-skeleton__specs">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={`spec-${index}`} className="card-skeleton__specs-row">
            <Skeleton height={12} width="33%" />
            <Skeleton height={12} width="24%" />
          </div>
        ))}
      </div>

      <div className="card-skeleton__actions">
        <Skeleton className="card-skeleton__button" height={40} />
        <Skeleton height={40} width={40} />
      </div>
    </article>
  );
};
