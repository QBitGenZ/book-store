// import React from 'react';
// import { useDispatch, useSelector, } from 'react-redux';
// import { useNavigate, } from 'react-router-dom';
// import { authRoutes, clientRoutes, } from '~/configs/routes';
// import { translate, } from '~/helpers';
// import { Avatar, Box, IconButton, Menu, MenuItem, Paper, Tooltip, Typography, } from '@mui/material';
// import { logout, } from '~/redux/auth/slice';
// import { DropdownCategories, SearchBar, } from '~/components';
// import { getTypesRequestStart, } from '~/redux/productType/slice';
// import HeaderItem from '~/components/CustomerHeader/HeaderItem';
// import { getCartRequestStart, } from '~/redux/cart/slice';
// import CartModal from '~/components/CustomerHeader/CartModal';
//
// const CustomerHeader = () => {
//   const [anchorElUser, setAnchorElUser,] = React.useState(null);
//   const { user, } = useSelector((state) => state.auth);
//   // const { cart, } = useSelector((state) => state.cart);
//   // const { shop, } = useSelector(state => state.config);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { types, } = useSelector(state => state.type);
//   const [orderBy,] = React.useState('');
//   const [descending,] = React.useState(true);
//   const [page,] = React.useState(1);
//   const [limit,] = React.useState(200);
//
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };
//
//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };
//
//   const getTypes = () => {
//     dispatch(getTypesRequestStart({
//       orderBy,
//       page,
//       limit,
//       descending,
//     }));
//   };
//
//   const getCart = () => {
//     dispatch(getCartRequestStart());
//   };
//
//   const settings = [
//     // {
//     //   handle: () => {
//     //     navigate(clientRoutes.home);
//     //   },
//     //   label: translate('home'),
//     // },
//     {
//       handle: () => {
//         navigate(clientRoutes.userInfo);
//       },
//       label: translate('User-Info'),
//     },
//     {
//       handle: () => {
//         navigate(clientRoutes.orderHistory);
//       },
//       label: translate('order-history'),
//     },
//     {
//       handle: () => {
//         localStorage.removeItem('token');
//         dispatch(logout());
//         navigate(authRoutes.login);
//       },
//       label: translate('logout'),
//     },
//   ];
//
//   const handleChangeCartPage = () => {
//     navigate(clientRoutes.cart);
//   };
//   const goToHome = () => {
//     navigate(clientRoutes.home);
//   };
//   React.useEffect(() => {
//     getTypes();
//     getCart();
//   }, [dispatch,]);
//
//   return (
//     <Paper className='mx-auto w-full px-16 py-2 sticky top-0 z-40'>
//
//       <div className='flex justify-end items-center space-x-2 gap-3'>
//         <div className={'flex flex-row w-full gap-24'}>
//           <div onClick={goToHome}>
//             <img className='h-12' src={`${process.env.PUBLIC_URL}/assets/pages/other/bookStore.png`}
//               alt='Home'/>
//           </div>
//           <div className={'ml-6 self-center w-'}>
//             <div className={'flex flex-row gap-3'}>
//               <HeaderItem
//                 route={clientRoutes.home}
//                 name={'home'}
//               ></HeaderItem>
//               <DropdownCategories items={types} name={'Danh mục'}/>
//               <HeaderItem
//                 route={clientRoutes.event}
//                 name={'event'}
//               ></HeaderItem>
//               <HeaderItem
//                 route={clientRoutes.book}
//                 name={'book'}
//               ></HeaderItem>
//
//               <HeaderItem
//                 route={clientRoutes.shareBook}
//                 name={'sharing-book'}
//               ></HeaderItem>
//             </div>
//           </div>
//         </div>
//         <div className={'max-w-fit flex flex-row justify-end  items-center space-x-2 gap-3'}>
//           {/* Search Bar*/}
//           <div className={'mr-6 max-w-fit'}>
//             <SearchBar></SearchBar>
//           </div>
//
//           {/* Cart Icon*/}
//           <div onClick={handleChangeCartPage}>
//             <CartModal></CartModal>
//           </div>
//
//           {/* User*/}
//           <Box sx={{
//             flexGrow: 0,
//           }}>
//             <Tooltip title={user.fullname}>
//               <IconButton onClick={handleOpenUserMenu} sx={{
//                 p: 0,
//               }}>
//                 <Avatar alt={user.fullname} src={`${process.env.REACT_APP_HOST_IP}/${user?.avatar}`}/>
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{
//                 mt: '45px',
//               }}
//               id='menu-appbar'
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top', horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top', horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting, index) => (
//                 <MenuItem key={index} onClick={() => {
//                   setting.handle();
//                   handleCloseUserMenu();
//                 }}>
//                   <Typography textAlign='center'>
//                     <div className='no-underline text-sm text-gray-700'>{setting?.label}</div>
//                   </Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </div>
//       </div>
//     </Paper>
//   );
// };
//
// export default CustomerHeader;

import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { authRoutes, clientRoutes, } from '~/configs/routes';
import { translate, } from '~/helpers';
import { Avatar, Box, IconButton, Menu, MenuItem, Paper, Tooltip, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { logout, } from '~/redux/auth/slice';
import { DropdownCategories, SearchBar, } from '~/components';
import { getTypesRequestStart, } from '~/redux/productType/slice';
import HeaderItem from '~/components/CustomerHeader/HeaderItem';
import { getCartRequestStart, } from '~/redux/cart/slice';
import CartModal from '~/components/CustomerHeader/CartModal';
import useMediaQuery from '@mui/material/useMediaQuery';

const CustomerHeader = () => {
  const [anchorElUser, setAnchorElUser,] = React.useState(null);
  const [mobileNavOpen, setMobileNavOpen,] = React.useState(false);
  const { user, } = useSelector((state) => state.auth);
  const { types, } = useSelector((state) => state.type);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const toggleMobileNav = () => setMobileNavOpen((prev) => !prev);

  const getTypes = () => {
    dispatch(
      getTypesRequestStart({
        orderBy: '',
        page: 1,
        limit: 200,
        descending: true,
      })
    );
  };

  const getCart = () => {
    dispatch(getCartRequestStart());
  };

  const settings = [
    {
      handle: () => navigate(clientRoutes.userInfo),
      label: translate('User-Info'),
    },
    {
      handle: () => navigate(clientRoutes.orderHistory),
      label: translate('order-history'),
    },
    {
      handle: () => {
        localStorage.removeItem('token');
        dispatch(logout());
        navigate(authRoutes.login);
      },
      label: translate('logout'),
    },
  ];

  const handleChangeCartPage = () => navigate(clientRoutes.cart);
  const goToHome = () => navigate(clientRoutes.home);

  React.useEffect(() => {
    getTypes();
    getCart();
  }, [dispatch,]);

  return (
    <Paper className='mx-auto w-full px-4 py-2 sticky top-0 z-40'>
      <div className='flex justify-between items-center'>
        {/* Logo Section */}
        <div className='flex items-center space-x-4'>
          <div onClick={goToHome} className='cursor-pointer'>
            <img
              className='h-10 md:h-12'
              src={`${process.env.PUBLIC_URL}/assets/pages/other/bookStore.png`}
              alt='Home'
            />
          </div>
          {isSmallScreen && (
            <IconButton onClick={toggleMobileNav}>
              {mobileNavOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </div>

        {/* Desktop Navigation */}
        {!isSmallScreen && (
          <div className='flex items-center space-x-4'>
            <HeaderItem route={clientRoutes.home} name={'home'} />
            <DropdownCategories items={types} name={'Danh mục'} />
            <HeaderItem route={clientRoutes.event} name={'events'} />
            <HeaderItem route={clientRoutes.book} name={'book'} />
            <HeaderItem route={clientRoutes.shareBook} name={'sharing-book'} />
          </div>
        )}

        {/* Right Actions */}
        <div className='flex items-center space-x-4'>
          {!isSmallScreen && <SearchBar />}
          <div onClick={handleChangeCartPage}>
            <CartModal />
          </div>
          <Box>
            <Tooltip title={user?.fullname}>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  alt={user?.fullname}
                  src={`${process.env.REACT_APP_HOST_IP}/${user?.avatar}`}
                />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: 'top', horizontal: 'right', 
              }}
              transformOrigin={{
                vertical: 'top', horizontal: 'right', 
              }}
            >
              {settings.map((setting, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    setting.handle();
                    handleCloseUserMenu();
                  }}
                >
                  {setting.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isSmallScreen && mobileNavOpen && (
        <div className='flex flex-col space-y-4 mt-4'>
          <SearchBar />
          <HeaderItem route={clientRoutes.home} name={'home'} />
          <DropdownCategories items={types} name={'Danh mục'} />
          <HeaderItem route={clientRoutes.event} name={'event'} />
          <HeaderItem route={clientRoutes.book} name={'book'} />
          <HeaderItem route={clientRoutes.shareBook} name={'sharing-book'} />
        </div>
      )}
    </Paper>
  );
};

export default CustomerHeader;
