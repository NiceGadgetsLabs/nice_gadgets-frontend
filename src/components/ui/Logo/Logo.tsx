import clsx from 'clsx';
import { Link } from 'react-router';
import { Icon } from '../Icon/Icon';
import './Logo.scss';

export type Placement = 'header' | 'footer';

interface Props {
  type: Placement;
}

export const Logo = ({ type }: Props) => (
  <Link to="/" className={clsx('logo', `logo--${type}`)} aria-label="Go to home">
    <Icon type="logo" />
  </Link>
);
