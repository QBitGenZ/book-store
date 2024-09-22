import { v4 as uuid4, } from 'uuid';
import { translate, } from '~/helpers';
import { adminRoutes, } from '~/configs/routes';

const sidebar = [
  {
    key: `side-bar-${uuid4()}`,
    label: translate('dashboard'),
    path: adminRoutes.dashboard,
  },
  {
    key: `side-bar-${uuid4()}`,
    label: translate('category'),
    children: [
      {
        key: `side-bar-${uuid4()}`,
        label: translate('product-type'),
        path: adminRoutes.productType,
      },
      {
        key: `side-bar-${uuid4()}`,
        label: translate('author'),
        path: adminRoutes.author,
      },
      {
        key: `side-bar-${uuid4()}`,
        label: translate('publisher'),
        path: adminRoutes.publisher,
      },
      {
        key: `side-bar-${uuid4()}`,
        label: translate('payment-method'),
        path: adminRoutes.paymentMethod,
      },
      {
        key: `side-bar-${uuid4()}`,
        label: translate('payment-status'),
        path: adminRoutes.paymentStatus,
      },
      {
        key: `side-bar-${uuid4()}`,
        label: translate('delivery-method'),
        path: adminRoutes.deliveryMethod,
      },
      {
        key: `side-bar-${uuid4()}`,
        label: translate('delivery-status'),
        path: adminRoutes.deliveryStatus,
      },
    ],
  },
  {
    key: `side-bar-${uuid4()}`,
    label: translate('product'),
    path: adminRoutes.product,
  },
  {
    key: `side-bar-${uuid4()}`,
    label: translate('event'),
    path: adminRoutes.event,
  },
  {
    key: `side-bar-${uuid4()}`,
    label: translate('order'),
    path: adminRoutes.order,
  },
  {
    key: `side-bar-${uuid4()}`,
    label: translate('settings'),
    path: adminRoutes.config,
  },
];

export default sidebar;