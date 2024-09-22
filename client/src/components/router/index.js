import { Suspense, } from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import React from 'react';

import { LoadingPage, NotFoundPage, } from '~/pages';
import { AdminAuthLayout, AdminMainLayout, CustomerAuthLayout, } from '~/layouts';
import { customerAuthRoutes, adminAuthRoutes, adminMainRoutes, } from '~/routes';

const Routing = () => (
  <Suspense fallback={<LoadingPage />}>
    <Router>
      <Routes>
        {adminMainRoutes.map(({ id, path, element, }) => (
          <Route
            key={id}
            path={path}
            element={<AdminMainLayout>{element}</AdminMainLayout>}
          />
        ))}
        {customerAuthRoutes.map(({ id, path, element, }) => (
          <Route
            key={id}
            path={path}
            element={<CustomerAuthLayout>{element}</CustomerAuthLayout>}
          />
        ))}
        {adminAuthRoutes.map(({ id, path, element, }) => (
          <Route
            key={id}
            path={path}
            element={<AdminAuthLayout>{element}</AdminAuthLayout>}
          />
        ))}

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  </Suspense>
);

export default Routing;