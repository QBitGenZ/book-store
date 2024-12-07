import { v4 as uuid4, } from 'uuid';
import { adminRoutes, } from '~/configs/routes';
import { AdminProfilePage,
  AuthorDetailPage,
  AuthorPage,
  BookCensorshipPage,
  ConfigPage,
  CreateProductPage,
  DashboardPage,
  DeliveryMethodPage,
  DeliveryStatusPage,
  DetailOrderPage,
  EBookPage, EventDetailPage,
  EventPage,
  OrderPage,
  PaymentMethodPage,
  PaymentStatusPage,
  ProductDetailPage,
  ProductPage,
  ProductTypePage,
  PublisherPage,
  ReadingEbookPage,
  UpdateProductPage,
  UserPage,
  UpdateEBookPage, CreateEbookPage, } from '~/pages';
import React from 'react';

export default [
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.product,
    element: <ProductPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.productType,
    element: <ProductTypePage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.author,
    element: <AuthorPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.config,
    element: <ConfigPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.dashboard,
    element: <DashboardPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.deliveryMethod,
    element: <DeliveryMethodPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.deliveryStatus,
    element: <DeliveryStatusPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.paymentMethod,
    element: <PaymentMethodPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.paymentStatus,
    element: <PaymentStatusPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.event,
    element: <EventPage />,
  },
  {
    id: `admin-${uuid4}`,
    path: adminRoutes.eventDetail,
    element: <EventDetailPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.publisher,
    element: <PublisherPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.order,
    element: <OrderPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.profile,
    element: <AdminProfilePage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.productDetail,
    element: <ProductDetailPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.createProduct,
    element: <CreateProductPage />,
  },
  {
    id: `admin-${uuid4()}`,
    path: adminRoutes.updateProduct,
    element: <UpdateProductPage />,
  },
  {
    id: `admin-${uuid4}`,
    path: adminRoutes.detailOrder,
    element: <DetailOrderPage />,
  },
  {
    id: `admin-${uuid4}`,
    path: adminRoutes.user,
    element: <UserPage />,
  },
  {
    id: `admin-${uuid4}`,
    path: adminRoutes.authorDetail,
    element: <AuthorDetailPage />,
  },
  {
    id: `admin-${uuid4}`,
    path: adminRoutes.ebook,
    element: <EBookPage />,
  },
  {
    id: `admin-${uuid4}`,
    path: adminRoutes.bookCensorship,
    element: <BookCensorshipPage />,
  },
  {
    id: `admin-${uuid4}`,
    path: adminRoutes.readEbook,
    element: <ReadingEbookPage />,
  },
  {
    id: `admin-${uuid4}`,
    path: adminRoutes.updateEbook,
    element: <UpdateEBookPage />,
  },
  {
    id: `admin-${uuid4}`,
    path: adminRoutes.createEbook,
    element: <CreateEbookPage />,
  },
];
