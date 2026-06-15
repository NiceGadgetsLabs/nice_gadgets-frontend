import type { FC } from 'react';
import './EmptyState.scss';

interface Props {
  title: string;
  image?: string;
}

export const EmptyState: FC<Props> = ({ title, image }) => {
  return (
    <div className="empty-state">
      <h2 className="empty-state__title">{title}</h2>
      {image && <img className="empty-state__image" src={image} alt="" />}
    </div>
  );
};
