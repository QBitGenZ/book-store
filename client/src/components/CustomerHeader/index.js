import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { authRoutes, clientRoutes, } from '~/configs/routes';
import { translate, } from '~/helpers';
import { Avatar, Box, IconButton, Menu, MenuItem, Paper, Tooltip, Typography, } from '@mui/material';
import { logout, } from '~/redux/auth/slice';

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
        // Todo: config route
      },
      label: translate('home'),
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

  return (
    <Paper className='mx-auto w-full px-16 py-3 sticky top-0 z-40'>

      <div className='flex justify-end items-center space-x-2'>
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