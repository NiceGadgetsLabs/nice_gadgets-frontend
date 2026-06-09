import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';
import { FavoritesContext } from '../../../contexts/favorites/FavoritesContext';
import { CartContext } from '../../../contexts/cart/CartContext';
import './Header.scss';
import { Logo } from '../../atoms/Logo/Logo';

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
  const { fav } = useContext(FavoritesContext);
  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="header__logo">
        <Logo type="header" />
      </div>

      <nav className="header__nav">
        <ul className="header__nav-list">
          {navItems.map(({ to, label }) => (
            <li key={to} className="header__nav-item">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  clsx('header__nav-link', {
                    'header__nav-link--active': isActive,
                  })
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header__actions">
        <ul className="header__actions-list">
          <li className="header__actions-item">
            <NavLink
              to="/favorites"
              aria-label="Favorites"
              className={({ isActive }) =>
                clsx('header__actions-link', 'header__actions-link--favorites', {
                  'header__actions-link--active': isActive,
                })
              }
            >
              {fav.length > 0 && (
                <div className="header__counter">
                  <span className="header__counter-value">{fav.length}</span>
                </div>
              )}
            </NavLink>
          </li>

          <li className="header__actions-item">
            <NavLink
              to="/cart"
              aria-label="Cart"
              className={({ isActive }) =>
                clsx('header__actions-link', 'header__actions-link--cart', {
                  'header__actions-link--active': isActive,
                })
              }
            >
              {cartCount > 0 && (
                <div className="header__counter">
                  <span className="header__counter-value">{cartCount}</span>
                </div>
              )}
            </NavLink>
          </li>

          <li className="header__actions-item">
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              className={clsx('header__actions-link', 'header__actions-link--menu', {
                'header__actions-link--menu-open': isMenuOpen,
              })}
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            />
          </li>
        </ul>
      </div>
    </header>
  );
}
