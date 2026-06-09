import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import './Logo.scss';

export type Placement = 'header' | 'footer';

interface Props {
  type: Placement;
}

export const Logo = ({ type }: Props) => (
  <Link to="/" className={clsx('logo', `logo--${type}`)} aria-label="Go to home">
    <Icon type="logo" width="100%" height="100%" />
  </Link>
);
