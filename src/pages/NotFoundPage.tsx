import type { FC } from 'react';
import { NotFound, type NotFoundVariant } from '../components/organisms/NotFound/NotFound';

interface Props {
  variant?: NotFoundVariant;
}

export const NotFoundPage: FC<Props> = ({ variant = 'page' }) => {
  return <NotFound variant={variant} />;
};
