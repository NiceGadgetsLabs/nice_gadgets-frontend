import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { FavoritesContext } from '../../../contexts/favorites/FavoritesContext';
import { CartContext } from '../../../contexts/cart/CartContext';
import { ThemeContext } from '../../../contexts/theme/ThemeContext';
import { Logo } from '../../atoms/Logo/Logo';
import { Icon } from '../../atoms/Icon/Icon';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { NAV_ITEMS } from '../../../constants/navigation';
import type { IconType } from '../../atoms/Icon/Icon';
import type { ThemeMode } from '../../../contexts/theme/ThemeContext';
import './Header.scss';

const THEME_ICON: Record<ThemeMode, IconType> = {
  auto: 'auto',
  light: 'sun',
  dark: 'moon',
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { fav } = useContext(FavoritesContext);
  const { cart } = useContext(CartContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const tabletQuery = window.matchMedia('(min-width: 640px)');

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    tabletQuery.addEventListener('change', handleChange);

    return () => {
      tabletQuery.removeEventListener('change', handleChange);
    };
  }, []);

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
              <button
                type="button"
                aria-label={`Theme: ${theme}`}
                className="header__actions-link header__actions-link--theme"
                onClick={toggleTheme}
              >
                <Icon type={THEME_ICON[theme]} />
              </button>
            </li>

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
                <Icon type="favorites" />

                {fav.length > 0 && (
                  <div className="header__counter">
                    <span className="header__counter-value" key={fav.length}>
                      {fav.length}
                    </span>
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
                <Icon type="cart" />

                {cartCount > 0 && (
                  <div className="header__counter">
                    <span className="header__counter-value" key={cartCount}>
                      {cartCount}
                    </span>
                  </div>
                )}
              </NavLink>
            </li>

            <li className="header__actions-item">
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                aria-controls="burger-menu"
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
