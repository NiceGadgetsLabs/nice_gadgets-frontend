import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import './index.scss';
import { HashRouter as Router } from 'react-router-dom';
import { FavoritesProvider } from './contexts/favorites/FavoritesProvider.tsx';
import { CartProvider } from './contexts/cart/CartProvider.tsx';
import { ScrollToTop } from './services/ToTop.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ScrollToTop>
        <FavoritesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FavoritesProvider>
      </ScrollToTop>
    </Router>
  </StrictMode>,
);
