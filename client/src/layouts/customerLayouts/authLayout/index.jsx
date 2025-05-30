import React, { useEffect, useState, } from 'react';
import { LoadingPage, } from '~/pages';
import { useDispatch, useSelector, } from 'react-redux';
import { getInfoRequestStart, } from '~/redux/auth/slice';
import { Navigate, } from 'react-router-dom';
import { clientRoutes, } from '~/configs/routes';

const CustomerAuthLayout = ({ children, }) => {
  const [isLogin, setIsLogin,] = useState(false);
  const [isLoading, setIsLoading,] = useState(true);
  const { user, loading, error, } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) dispatch(getInfoRequestStart());
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('token');

      if (isAuthenticated && !error) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }

      setIsLoading(false);
    };

    if (!loading) {
      checkAuth();
    }
  }, [loading, error,]);

  const render = () => {
    if (loading || isLoading) return <LoadingPage />;

    if (isLogin) return <Navigate to={clientRoutes.home} />;

    return (
      <div>
        <main>{children}</main>
      </div>
    );
  };

  return render();
};

export default CustomerAuthLayout;
