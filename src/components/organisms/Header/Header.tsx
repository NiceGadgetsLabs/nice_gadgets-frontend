import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import clsx from 'clsx';
import { FavoritesContext } from '../../../contexts/favorites/FavoritesContext';
import { CartContext } from '../../../contexts/cart/CartContext';
import { Logo } from '../../atoms/Logo/Logo';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { NAV_ITEMS } from '../../../constants/navigation';
import './Header.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { fav } = useContext(FavoritesContext);
  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <Logo type="header" />
        </div>

        <nav className="header__nav">
          <ul className="header__nav-list">
            {NAV_ITEMS.map(({ to, label }) => (
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

      <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
