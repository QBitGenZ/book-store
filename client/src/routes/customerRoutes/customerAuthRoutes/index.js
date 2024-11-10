import { v4 as uuid4, } from 'uuid';
import { authRoutes, } from '~/configs/routes';
import React from 'react';
import { LoginPage, SignUpPage, } from '~/pages';

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
];
