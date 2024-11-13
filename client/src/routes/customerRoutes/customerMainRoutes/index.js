import { v4 as uuid4, } from 'uuid';
import { clientRoutes, } from '~/configs/routes';
import React from 'react';
import { BookPage,
  CartPage,
  CategoriesPage,
  CheckOutSuccessPage,
  CustomerAuthorDetailPage,
  CustomerAuthorPage,
  CustomerEventPage,
  EBookDetailPage,
  HomePage,
  OneStepCheckOutPage,
  OrderHistoryPage,
  ProductInfoPage,
  ReadEbookPage,
  SearchResultPage,
  ShareBookPage,
  UserInfoPage, } from '~/pages';

export default [
  {
    id: `client-${uuid4()}`,
    path: clientRoutes.home,
    element: <HomePage />,
  },
  {
    id: `client-${uuid4()}`,
    path: clientRoutes.product,
    element: <ProductInfoPage />,
  },
  {
    id: `client-${uuid4()}`,
    path: clientRoutes.cart,
    element: <CartPage />,
  },
  {
    id: `client-${uuid4()}`,
    path: clientRoutes.oneStepCheckOut,
    element: <OneStepCheckOutPage />,
  },
  {
    id: `client-${uuid4()}`,
    path: clientRoutes.categories,
    element: <CategoriesPage />,
  },
  {
    id: `client-${uuid4()}`,
    path: clientRoutes.search,
    element: <SearchResultPage />,
  },
  {
    id: `client-${uuid4()}`,
    path: clientRoutes.orderHistory,
    element: <OrderHistoryPage />,
  },
  {
    id: `client-${uuid4()}`,
    path: clientRoutes.userInfo,
    element: <UserInfoPage />,
  },
  {
    id: `client-${uuid4}`,
    path: clientRoutes.orderSuccess,
    element: <CheckOutSuccessPage />,
  },
  {
    id: `client-${uuid4}`,
    path: clientRoutes.event,
    element: <CustomerEventPage />,
  },
  {
    id: `client-${uuid4}`,
    path: clientRoutes.authorDetail,
    element: <CustomerAuthorDetailPage />,
  },
  {
    id: `client-${uuid4}`,
    path: clientRoutes.book,
    element: <BookPage />,
  },
  {
    id: `client-${uuid4}`,
    path: clientRoutes.shareBook,
    element: <ShareBookPage />,
  },
  {
    id: `client-${uuid4}`,
    path: clientRoutes.ebook,
    element: <EBookDetailPage />,
  },
  {
    id: `client-${uuid4}`,
    path: clientRoutes.readEbook,
    element: <ReadEbookPage />,
  },
  {
    id: `client-${uuid4}`,
    path: clientRoutes.author,
    element: <CustomerAuthorPage />,
  },
];
