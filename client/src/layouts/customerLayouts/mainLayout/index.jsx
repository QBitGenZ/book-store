// import React, { useEffect, } from 'react';
// import { useDispatch, useSelector, } from 'react-redux';
// import { getInfoRequestStart, } from '~/redux/auth/slice';
// import { LoadingPage, } from '~/pages';
// import { authRoutes, } from '~/configs/routes';
// import { Navigate, } from 'react-router-dom';
// import { CustomerHeader, Footer, PopupChat, } from '~/components';
//
// const CustomerMainLayout = ({ children, }) => {
//   const { user, loading, } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//
//   useEffect(() => {
//     dispatch(getInfoRequestStart());
//   }, [dispatch,]);
//   const render = () => {
//     if (loading) return <LoadingPage />;
//
//     if (!user) return <Navigate to={authRoutes.login} />;
//
//     return (
//       <div>
//         <main className='flex bg-[#F5F8FA] h-screen overflow-y-auto'>
//           <div className='flex flex-col flex-grow'>
//             <CustomerHeader/>
//             <div className='flex-grow p-6 sm:mx-8 md:mx-8 lg:mx-12 xl:mx-28'>
//               {children}
//             </div>
//             <Footer/>
//             <PopupChat/>
//           </div>
//         </main>
//
//       </div>
//     );
//   };
//
//   return render();
// };
//
// export default CustomerMainLayout;

import React, { useEffect, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getInfoRequestStart, } from '~/redux/auth/slice';
import { LoadingPage, } from '~/pages';
import { authRoutes, } from '~/configs/routes';
import { Navigate, } from 'react-router-dom';
import { CustomerHeader, Footer, PopupChat, } from '~/components';

const CustomerMainLayout = ({ children, }) => {
  const { user, loading, } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfoRequestStart());
  }, [dispatch,]);

  const render = () => {
    if (loading) return <LoadingPage />;

    if (!user) return <Navigate to={authRoutes.login} />;

    return (
      <div className='flex flex-col h-screen bg-[#F5F8FA]'>
        {/* Main content container */}
        <CustomerHeader />
        <main className='flex-grow flex flex-col'>
          <div className='flex-grow p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 max-w-full sm:mx-8 md:mx-8 lg:mx-12 xl:mx-28'>
            {children}
          </div>
        </main>
        {/* Footer */}
        <Footer />
        {/* Popup Chat */}
        <PopupChat />
      </div>
    );
  };

  return render();
};

export default CustomerMainLayout;
