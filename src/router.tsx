import { Navigate, createBrowserRouter } from 'react-router';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductPage } from './pages/ProductPage';
import type { RouteObject } from 'react-router';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'home',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'phones',
        element: <CatalogPage category="phones" />,
      },
      {
        path: 'phones/:productId',
        element: <ProductPage />,
      },
      {
        path: 'tablets',
        element: <CatalogPage category="tablets" />,
      },
      {
        path: 'tablets/:productId',
        element: <ProductPage />,
      },
      {
        path: 'accessories',
        element: <CatalogPage category="accessories" />,
      },
      {
        path: 'accessories/:productId',
        element: <ProductPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
