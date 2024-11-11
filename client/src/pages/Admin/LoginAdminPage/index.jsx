import { Button, Paper, TextField, } from '@mui/material';
import React from 'react';
import { useDispatch, } from 'react-redux';
import { Link, useNavigate, } from 'react-router-dom';
import { translate, } from '~/helpers';
import { loginRequestStart, } from '~/redux/auth/slice';
import { adminRoutes, authRoutes, } from '~/configs/routes';

const LoginAdminPage = () => {
  const [username, setUsername,] = React.useState('');
  const [password, setPassword,] = React.useState('');

  const dispatch = useDispatch();
  const nav = useNavigate();

  const loginRequest = () => {
    dispatch(
      loginRequestStart(
        JSON.stringify({
          username,
          password,
        })
      )
    );
    nav(adminRoutes.profile);
  };

  const render = () => {
    return (
      <div className='flex w-screen h-screen relative top-0 left-0'>
        <Paper className='w-1/3 h-fit p-5 flex flex-col gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <h1 className='mb-4'>{translate('login')}</h1>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size='small'
            label={translate('username')}
            placeholder={translate('username')}
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            size='small'
            label={translate('password')}
            placeholder={translate('password')}
          />
          <div className='text-right'>
            <Link className='no-underline' to={authRoutes.forgotPassword}>
              <span className='no-underline'>
                {translate('forgot-password')} ?
              </span>
            </Link>
          </div>
          <Button variant='contained' onClick={loginRequest}>
            {translate('login')}
          </Button>
        </Paper>
      </div>
    );
  };

  return render();
};

export default LoginAdminPage;
