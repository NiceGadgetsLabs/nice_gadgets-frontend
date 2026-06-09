import { useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { FavoritesContext } from '../../../contexts/favorites/FavoritesContext';
import { CartContext } from '../../../contexts/cart/CartContext';
import './BurgerMenu.scss';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

type Props = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export function BurgerMenu({ setIsMenuOpen }: Props) {
  const { fav } = useContext(FavoritesContext);
  const { cart } = useContext(CartContext);

  return (
    <aside className="burger-menu">
      <nav className="burger-menu__nav">
        <ul className="burger-menu__nav-list">
          {navItems.map(({ to, label }) => (
            <li key={to} className="burger-menu__nav-item">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  clsx('burger-menu__nav-link', {
                    'burger-menu__nav-link--active': isActive,
                  })
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="burger-menu__actions">
        <ul className="burger-menu__actions-list">
          <li className="burger-menu__actions-item">
            <NavLink
              to="/favorites"
              aria-label="Favorites"
              className={({ isActive }) =>
                clsx('burger-menu__actions-link', 'burger-menu__actions-link--fav', {
                  'burger-menu__actions-link--active': isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {fav.length > 0 && (
                <div className="burger-menu__counter">
                  <p className="burger-menu__counter-value">{fav.length}</p>
                </div>
              )}
            </NavLink>
          </li>

          <li className="burger-menu__actions-item">
            <NavLink
              to="/cart"
              aria-label="Cart"
              className={({ isActive }) =>
                clsx('burger-menu__actions-link', 'burger-menu__actions-link--cart', {
                  'burger-menu__actions-link--active': isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {cart.length > 0 && (
                <div className="burger-menu__counter">
                  <p className="burger-menu__counter-value">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </p>
                </div>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}
