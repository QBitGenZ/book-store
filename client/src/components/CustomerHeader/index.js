import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { authRoutes, clientRoutes, } from '~/configs/routes';
import { translate, } from '~/helpers';
import { Avatar, Box, IconButton, Menu, MenuItem, Paper, Tooltip, Typography, } from '@mui/material';
import { logout, } from '~/redux/auth/slice';
import { faCartShopping, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { SearchBar, } from '~/components';

const CustomerHeader = () => {
  const [anchorElUser, setAnchorElUser,] = React.useState(null);
  const { user, } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    {
      handle: () => {
        navigate(clientRoutes.home);
      },
      label: translate('home'),
    },
    {
      handle: () => {
        navigate(clientRoutes.userInfo);
      },
      label: translate('User-Info'),
    },
    {
      handle: () => {
        navigate(clientRoutes.orderHistory);
      },
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

  const handleChangeCartPage = () => {
    navigate(clientRoutes.cart);
  };
  const goToHome = () => {
    navigate(clientRoutes.home);
  };

  return (
    <Paper className='mx-auto w-full px-16 py-2 sticky top-0 z-40'>

      <div className='flex justify-end items-center space-x-2 gap-3'>
        <div onClick={goToHome}>
          <img className='h-10' src={`${process.env.PUBLIC_URL}/assets/pages/other/bookStore.png`}
            alt='Home'/>
        </div>
        {/* Search Bar*/}
        <SearchBar></SearchBar>

        {/* Cart Icon*/}
        <div onClick={handleChangeCartPage}>
          <FontAwesomeIcon icon={faCartShopping}/>
        </div>

        {/* User*/}
        <Box sx={{
          flexGrow: 0,
        }}>
          <Tooltip title={user.fullname}>
            <IconButton onClick={handleOpenUserMenu} sx={{
              p: 0,
            }}>
              <Avatar alt={user.fullname} src={`${process.env.REACT_APP_HOST_IP}/${user?.avatar}`}/>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{
              mt: '45px',
            }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top', horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top', horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting, index) => (
              <MenuItem key={index} onClick={() => {
                setting.handle();
                handleCloseUserMenu();
              }}>
                <Typography textAlign='center'>
                  <div className='no-underline text-black'>{setting?.label}</div>
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </div>
    </Paper>
  );
};

export default CustomerHeader;