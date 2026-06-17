import { useContext, useEffect, type FC } from 'react';
import { NavLink } from 'react-router-dom';
import { FocusTrap } from 'focus-trap-react';
import clsx from 'clsx';
import { FavoritesContext } from '../../../contexts/favorites/FavoritesContext';
import { CartContext } from '../../../contexts/cart/CartContext';
import { Icon } from '../../atoms/Icon/Icon';
import { NAV_ITEMS } from '../../../constants/navigation';
import './BurgerMenu.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const BurgerMenu: FC<Props> = ({ isOpen, onClose }) => {
  const { fav } = useContext(FavoritesContext);
  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <FocusTrap
      active={isOpen}
      focusTrapOptions={{
        onDeactivate: onClose,
        escapeDeactivates: true,
        allowOutsideClick: true,
        returnFocusOnDeactivate: true,
        fallbackFocus: '#burger-menu',
      }}
    >
      <aside
        id="burger-menu"
        tabIndex={-1}
        inert={!isOpen}
        className={clsx('burger-menu', { 'burger-menu--open': isOpen })}
      >
        <nav className="burger-menu__nav">
          <ul className="burger-menu__nav-list">
            {NAV_ITEMS.map(({ to, label }) => (
              <li key={to} className="burger-menu__nav-item">
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    clsx('burger-menu__nav-link', {
                      'burger-menu__nav-link--active': isActive,
                    })
                  }
                  onClick={onClose}
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
                onClick={onClose}
              >
                <Icon type="favorites" />

                {fav.length > 0 && (
                  <div className="burger-menu__counter">
                    <p className="burger-menu__counter-value" key={fav.length}>
                      {fav.length}
                    </p>
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
                onClick={onClose}
              >
                <Icon type="cart" />

                {cartCount > 0 && (
                  <div className="burger-menu__counter">
                    <p className="burger-menu__counter-value" key={cartCount}>
                      {cartCount}
                    </p>
                  </div>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </FocusTrap>
  );
};
