import { Navigate, createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductPage } from './pages/ProductPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    handle: {
      breadcrumb: 'Home',
    },
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
        path: 'favorites',
        element: <FavoritesPage />,
        handle: {
          breadcrumb: 'Favorites',
        },
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: ':category',
        handle: {
          breadcrumb: 'Category',
        },
        children: [
          {
            index: true,
            element: <CatalogPage />,
          },
          {
            path: ':productId',
            element: <ProductPage />,
            handle: {
              breadcrumb: 'Product',
            },
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
