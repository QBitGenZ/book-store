import { v4 as uuid4, } from 'uuid';
import { clientRoutes, } from '~/configs/routes';
import React from 'react';
import { CartPage, CategoriesPage, HomePage, ProductInfoPage, } from '~/pages';
import SearchResultPage from '~/pages/Customer/SearchResultPage';

export default [
  {
    id: `client-${uuid4()}`,
    path: clientRoutes.home,
    element: <HomePage/>,
  },
  {
    id: `client-${uuid4()}`,
    path: clientRoutes.product,
    element: <ProductInfoPage/>,
  },
  {
    id: `client-${uuid4()}`,
    path: clientRoutes.cart,
    element: <CartPage/>,
  },
  {
    id: `client-${uuid4()}`,
    path: clientRoutes.categories,
    element: <CategoriesPage/>,
  },
  {
    id: `client-${uuid4()}`,
    path: clientRoutes.search,
    element: <SearchResultPage/>,
  },
];
