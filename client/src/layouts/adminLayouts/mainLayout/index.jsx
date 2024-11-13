import React, { useEffect, } from 'react';
import { LoadingPage, } from '~/pages';
import { useDispatch, useSelector, } from 'react-redux';
import { getInfoRequestStart, } from '~/redux/auth/slice';
import { authRoutes, } from '~/configs/routes';
import { Navigate, } from 'react-router-dom';
import { AdminHeader, Sidebar, } from '~/components';
import { getShopRequestStart, } from '~/redux/config/slice';

const AdminMainLayout = ({ children, }) => {
  const { user, loading, } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfoRequestStart());
    dispatch(getShopRequestStart());
  }, []);

  const render = () => {
    if (loading) return <LoadingPage />;

    if (!user?.isAdmin) return <Navigate to={authRoutes.adminLogin} />;

    return (
      <div>
        <main className='flex bg-gray-50 h-screen overflow-hidden'>
          <Sidebar className='bg-white shrink-0' />

          <div className='flex flex-col w-full '>
            <AdminHeader />
            <div className='overflow-y-auto p-3 h-full'>{children}</div>
          </div>
        </main>
      </div>
    );
  };

  return render();
};

export default AdminMainLayout;
