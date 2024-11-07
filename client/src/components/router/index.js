import React, { Suspense, useLayoutEffect, } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, } from 'react-router-dom';

import { LoadingPage, NotFoundPage, } from '~/pages';
import { AdminAuthLayout, AdminMainLayout, CustomerAuthLayout, CustomerMainLayout, } from '~/layouts';
import { adminAuthRoutes, adminMainRoutes, customerAuthRoutes, customerMainRoutes, } from '~/routes';

const ScrollToTop = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname,]);

  return null;
};

const Routing = () => (

  <Suspense fallback={<LoadingPage/>}>
    <Router>
      <ScrollToTop/>
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
        {customerMainRoutes.map(({ id, path, element, }) => (
          <Route
            key={id}
            path={path}
            element={<CustomerMainLayout>{element}</CustomerMainLayout>}
          />
        ))}

        <Route path='*' element={<NotFoundPage/>}/>

      </Routes>
    </Router>
  </Suspense>
);

export default Routing;
