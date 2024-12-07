import { v4 as uuid4, } from 'uuid';
import { authRoutes, } from '~/configs/routes';
import React from 'react';
import { ForgetPasswordPage, LoginAdminPage, ResetPasswordPage, } from '~/pages';

export default [
  {
    id: `auth-${uuid4()}`,
    path: authRoutes.adminLogin,
    element: <LoginAdminPage />,
  },
  {
    id: `auth-${uuid4()}`,
    path: authRoutes.adminForgotPassword,
    element: <ForgetPasswordPage />,
  },
  {
    id: `auth-${uuid4()}`,
    path: authRoutes.adminResetPassword,
    element: <ResetPasswordPage />,
  },
];
