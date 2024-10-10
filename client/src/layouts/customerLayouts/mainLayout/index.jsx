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
    dispatch(getInfoRequestStart());
  }, [dispatch,]);
  const render = () => {
    if (loading) return <LoadingPage/>;

    if (!user) return <Navigate to={authRoutes.login}/>;

    return (
      <div>
        <main className='flex bg-gray-50 h-screen overflow-y-auto'>
          <div className='flex flex-col flex-grow '>
            <CustomerHeader/>
            <div className='flex-grow p-6 my-6 sm:mx-6 md:mx-8 lg:mx-18 xl:mx-20'>
              {children}
            </div>
          </div>
        </main>
      </div>

    );
  };

  return render();
};

export default CustomerMainLayout;
