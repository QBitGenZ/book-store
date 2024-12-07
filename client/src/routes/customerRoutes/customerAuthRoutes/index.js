import { v4 as uuid4, } from 'uuid';
import { authRoutes, } from '~/configs/routes';
import React from 'react';
import { CustomerForgetPasswordPage, LoginPage, SignUpPage, } from '~/pages';
import CustomerResetPasswordPage from '../../../pages/Customer/CustomerResetPasswordPage';

export default [
  {
    id: `auth-${uuid4()}`,
    path: authRoutes.login,
    element: <LoginPage />,
  },
  {
    id: `auth-${uuid4()}`,
    path: authRoutes.logup,
    element: <SignUpPage />,
  },
  {
    id: `auth-${uuid4()}`,
    path: authRoutes.forgotPassword,
    element: <CustomerForgetPasswordPage />,
  },
  {
    id: `auth-${uuid4()}`,
    path: authRoutes.resetPassword,
    element: <CustomerResetPasswordPage/>,
  },
];
