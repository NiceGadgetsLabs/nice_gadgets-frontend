import clsx from 'clsx';
import type { SVGProps } from 'react';
import LogoIcon from '../../../assets/icons/Logo.svg?react';
import HomeIcon from '../../../assets/icons/Home.svg?react';
import MenuIcon from '../../../assets/icons/Menu.svg?react';
import CloseIcon from '../../../assets/icons/Close.svg?react';
import CartIcon from '../../../assets/icons/Cart.svg?react';
import PlusIcon from '../../../assets/icons/Plus.svg?react';
import MinusIcon from '../../../assets/icons/Minus.svg?react';
import SearchIcon from '../../../assets/icons/Search.svg?react';
import FavoritesIcon from '../../../assets/icons/Favorites.svg?react';
import FavoritesFilledIcon from '../../../assets/icons/Favorites-filled.svg?react';
import ArrowDownIcon from '../../../assets/icons/Arrow-down.svg?react';
import ArrowUpIcon from '../../../assets/icons/Arrow-up.svg?react';
import ArrowRightIcon from '../../../assets/icons/Arrow-right.svg?react';
import ArrowLeftIcon from '../../../assets/icons/Arrow-left.svg?react';
import './Icon.scss';

const ICONS_MAP = {
  logo: LogoIcon,
  home: HomeIcon,
  menu: MenuIcon,
  close: CloseIcon,
  cart: CartIcon,
  plus: PlusIcon,
  minus: MinusIcon,
  search: SearchIcon,
  favorites: FavoritesIcon,
  'favorites-filled': FavoritesFilledIcon,
  'arrow-up': ArrowUpIcon,
  'arrow-down': ArrowDownIcon,
  'arrow-right': ArrowRightIcon,
  'arrow-left': ArrowLeftIcon,
} as const;

export type IconType = keyof typeof ICONS_MAP;

interface Props extends SVGProps<SVGSVGElement> {
  type: IconType;
}

export const Icon = ({ className, type, ...props }: Props) => {
  const Component = ICONS_MAP[type];

  return <Component className={clsx('icon', className)} {...props} />;
};
