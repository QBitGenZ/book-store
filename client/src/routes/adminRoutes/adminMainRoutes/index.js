import { v4 as uuid4, } from 'uuid';
import { adminRoutes, } from '~/configs/routes';
import { AdminProfilePage, AuthorPage, ConfigPage, DashboardPage, DeliveryMethodPage, DeliveryStatusPage, EventPage, OrderPage, PaymentMethodPage, PaymentStatusPage, ProductPage, ProductTypePage, PublisherPage, } from '~/pages';
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
];