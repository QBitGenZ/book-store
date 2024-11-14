import { faGoogle, } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { Button, Paper, TextField, } from '@mui/material';
import React from 'react';
import { useDispatch, } from 'react-redux';
import { Link, useNavigate, } from 'react-router-dom';
import { translate, } from '~/helpers';
import { loginRequestStart, } from '~/redux/auth/slice';
import { authRoutes, clientRoutes, } from '~/configs/routes';

const LoginPage = () => {
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
    nav(clientRoutes.home);
  };

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;

    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const popup = window.open(
      `${process.env.REACT_APP_HOST_IP}/auth/google`,
      '_blank',
      `width=${width},height=${height},top=${top},left=${left}`
    );

    window.addEventListener(
      'message',
      (event) => {
        const token = event.data.token;
        if (token) {
          localStorage.setItem('token', token);
          console.log('Token received and saved:', token);
          popup.close();

          nav(clientRoutes.home);
        }
      },
      false
    );
  };

  const render = () => {
    return (
      <div className='flex w-screen h-screen relative top-0 left-0'>
        <Paper className='w-1/3 h-fit p-5 pb-3 flex flex-col gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
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
          <div>{translate('or')}</div>
          <Button
            sx={{
              backgroundColor: 'red',
              ':hover': {
                backgroundColor: 'red',
              },
            }}
            onClick={handleGoogleLogin}
            variant='contained'
          >
            <FontAwesomeIcon size='xl' className='mr-2' icon={faGoogle} />{' '}
            {translate('login-with-google')}
          </Button>
          <div className='mt-3'>
            <span>
              {translate('dont-have-account')}?{' '}
              <Link to={authRoutes.logup}>{translate('sign-up')}</Link>
            </span>
          </div>
        </Paper>
      </div>
    );
  };

  return render();
};

export default LoginPage;
