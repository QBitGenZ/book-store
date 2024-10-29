export const authRoutes = {
  login: '/login',
  logup: '/logup',
  resetPassword: '/reset-password',
  adminLogin: '/admin/login',
  forgotPassword: '/forgot-password',
};

export const adminRoutes = {
  dashboard: '/admin/dashboards',
  product: '/admin/products',

  productType: '/admin/categories/types',
  deliveryMethod: '/admin/categories/deliveries/methods',
  deliveryStatus: '/admin/categories/deliveries/statuses',
  paymentMethod: '/admin/categories/payments/methods',
  paymentStatus: '/admin/categories/payments/statuses',
  publisher: '/admin/categories/publisher',
  author: '/admin/categories/authors',

  event: '/admin/events',
  order: '/admin/order',
  detailOrder: '/admin/order/:id',
  config: '/admin/configs',

  profile: '/admin/profile',

  productDetail: '/admin/product/:id',
  createProduct: '/admin/create-product',
  updateProduct: '/admin/update-product/:id',
};

export const clientRoutes = {
  home: '/',
  product: '/:id',
  cart: '/cart',
  oneStepCheckOut: '/one-step-check-out',
  search: '/search/:query',
  categories: '/categories/:id',
  orderHistory: '/order-history',
  userInfo: '/userInfo',
};
