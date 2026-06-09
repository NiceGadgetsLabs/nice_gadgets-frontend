import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import { FavouritesContext } from '../Favorites/FavoritesContext';
import { CartContext } from '../Cart/CartContext';

import header from './Header.module.scss';
import logo from '../../../assets/icons/Logo.svg';

type HeaderProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const { fav } = useContext(FavouritesContext);
  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={header.header}>
      <Link to="/" className={header.header__logo}>
        <img
          src={logo}
          alt="Nice Gadgets logo"
          className={header.header__logo__img}
        />
      </Link>

      <nav className={header.nav}>
        <ul className={header.nav__list}>
          {navItems.map(({ to, label }) => (
            <li key={to} className={header.nav__item}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  cn(header.nav__link, {
                    [header.nav__link_active]: isActive,
                  })
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={header.actions}>
        <ul className={header.actions__list}>
          {/* Favorites */}
          <li className={header.actions__item}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                cn(header.actions__link, header.actions__link__favorites, {
                  [header.actions__link_active]: isActive,
                })
              }
            >
              {fav.length > 0 && (
                <div className={header.counter__container}>
                  <span className={header.counter__value}>{fav.length}</span>
                </div>
              )}
            </NavLink>
          </li>

          {/* Cart */}
          <li className={header.actions__item}>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                cn(header.actions__link, header.actions__link__cart, {
                  [header.actions__link_active]: isActive,
                })
              }
            >
              {cartCount > 0 && (
                <div className={header.counter__container}>
                  <span className={header.counter__value}>{cartCount}</span>
                </div>
              )}
            </NavLink>
          </li>

          {/* Menu button */}
          <li className={header.actions__item}>
            <button
              type="button"
              className={cn(header.actions__link, header.actions__link__menu, {
                [header.actions__link__menu__open]: isMenuOpen,
              })}
              onClick={() => setIsMenuOpen((v) => !v)}
            />
          </li>
        </ul>
      </div>
    </header>
  );
}
