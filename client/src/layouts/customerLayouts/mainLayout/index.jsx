import React, { useEffect, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getInfoRequestStart, } from '~/redux/auth/slice';
import { LoadingPage, } from '~/pages';
import { authRoutes, } from '~/configs/routes';
import { Navigate, } from 'react-router-dom';
import { CustomerHeader, } from '~/components';

const CustomerMainLayout = ({ children, }) => {
  const { user, loading, } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfoRequestStart);
  }, []);
  const render = () => {
    if (loading) return <LoadingPage />;

    if (!user) return <Navigate to={authRoutes.login} />;

    return (
      <div>
        <main>
          <CustomerHeader />
          <div>{children}</div>

        </main>
      </div>
    );
  };

  return render();
};

export default CustomerMainLayout;
