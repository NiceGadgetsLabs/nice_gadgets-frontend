import type { FC } from 'react';
import { Skeleton } from '../../atoms/Skeleton/Skeleton';
import { ProductLayout } from '../../../layouts/ProductLayout/ProductLayout';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import './ProductDetailsSkeleton.scss';

const GallerySkeleton: FC = () => (
  <div className="details-skeleton__gallery" aria-hidden="true">
    <Skeleton className="details-skeleton__main-image" />

    <div className="details-skeleton__thumbs">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={`thumb-${index}`} className="details-skeleton__thumb" />
      ))}
    </div>
  </div>
);

const InfoSkeleton: FC = () => (
  <div className="details-skeleton__info" aria-hidden="true">
    <div className="details-skeleton__options">
      <div className="details-skeleton__picker">
        <Skeleton className="details-skeleton__text" height={21} width="40%" />

        <div className="details-skeleton__picker-row">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={`color-${index}`} width={32} height={32} borderRadius="50%" />
          ))}
        </div>
      </div>

      <hr className="details-skeleton__divider" />

      <div className="details-skeleton__picker">
        <Skeleton className="details-skeleton__text" height={21} width="40%" />

        <div className="details-skeleton__picker-row">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={`capacity-${index}`} width={60} height={32} />
          ))}
        </div>
      </div>

      <hr className="details-skeleton__divider" />
    </div>

    <div className="details-skeleton__actions">
      <Skeleton className="details-skeleton__text details-skeleton__price" width="40%" />

      <div className="details-skeleton__buttons">
        <Skeleton className="details-skeleton__buy" height={48} />
        <Skeleton width={48} height={48} />
      </div>
    </div>

    <div className="details-skeleton__specs">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={`info-spec-${index}`} className="details-skeleton__specs-row">
          <Skeleton className="details-skeleton__text" height={21} width="33%" />
          <Skeleton className="details-skeleton__text" height={21} width="24%" />
        </div>
      ))}
    </div>
  </div>
);

const AboutSkeleton: FC = () => (
  <div className="details-skeleton__about" aria-hidden="true">
    <div className="details-skeleton__heading">
      <Skeleton className="details-skeleton__text details-skeleton__heading-text" width="33%" />
      <hr className="details-skeleton__divider" />
    </div>

    <div className="details-skeleton__about-sections">
      {Array.from({ length: 3 }).map((_, sectionIndex) => (
        <div key={`about-${sectionIndex}`} className="details-skeleton__about-section">
          <Skeleton className="details-skeleton__text details-skeleton__subtitle" width="50%" />
          <div>
            <Skeleton className="details-skeleton__text" height={21} />
            <Skeleton className="details-skeleton__text" height={21} />
            <Skeleton className="details-skeleton__text" height={21} width="66%" />
          </div>
          <div>
            <Skeleton className="details-skeleton__text" height={21} />
            <Skeleton className="details-skeleton__text" height={21} width="45%" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TechSpecsSkeleton: FC = () => (
  <div className="details-skeleton__tech-specs" aria-hidden="true">
    <div className="details-skeleton__heading">
      <Skeleton className="details-skeleton__text details-skeleton__heading-text" width="33%" />
      <hr className="details-skeleton__divider" />
    </div>

    <div className="details-skeleton__specs">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={`tech-spec-${index}`} className="details-skeleton__specs-row">
          <Skeleton className="details-skeleton__text" height={21} width="33%" />
          <Skeleton className="details-skeleton__text" height={21} width="40%" />
        </div>
      ))}
    </div>
  </div>
);

export const ProductDetailsSkeleton: FC = () => {
  return (
    <ProductLayout
      breadcrumbs={<Skeleton width={320} height={16} />}
      title={<Skeleton className="details-skeleton__text details-skeleton__title" width="50%" />}
      gallery={<GallerySkeleton />}
      info={<InfoSkeleton />}
      about={<AboutSkeleton />}
      specs={<TechSpecsSkeleton />}
      recommended={<ProductSlider title="You may also like" products={[]} isLoading />}
    />
  );
};
