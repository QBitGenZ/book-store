import { faGoogle, } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { Button, Paper, TextField, } from '@mui/material';
import React from 'react';
import { Link, } from 'react-router-dom';
import { translate, } from '~/helpers';
import { authRoutes, } from '~/configs/routes';
import { DatePicker, } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useDispatch, } from 'react-redux';
import { registerRequestStart, } from '~/redux/auth/slice';

const SignUpPage = () => {
  const [username, setUsername,] = React.useState('');
  const [fullname, setFullname,] = React.useState('');
  const [password, setPassword,] = React.useState('');
  const [birthday, setBirthday,] = React.useState(dayjs(Date.now()));
  const [phone, setPhone,] = React.useState('');
  const [email, setEmail,] = React.useState('');
  const [address, setAddress,] = React.useState('');

  const dispatch = useDispatch();

  const logup = () => {
    dispatch(
      registerRequestStart(
        JSON.stringify({
          username,
          fullname,
          password,
          birthday,
          phone,
          email,
          address,
        })
      )
    );
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
        }
      },
      false
    );
  };

  const render = () => {
    return (
      <div className='flex w-screen h-screen relative top-0 left-0'>
        <Paper className='w-1/3 h-fit p-3 flex flex-col gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <h1 className='mb-4'>{translate('sign-up')}</h1>
          <TextField
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            size='small'
            label={translate('fullname')}
            placeholder={translate('fullname')}
          />
          <div className='flex justify-between'>
            <TextField
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              size='small'
              label={translate('phone')}
              placeholder={translate('phone')}
            />
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size='small'
              label={translate('email')}
              placeholder={translate('email')}
            />
          </div>
          <DatePicker
            label={translate('birthday')}
            format='DD/MM/YYYY'
            value={birthday}
            onChange={(e) => setBirthday(e)}
            slotProps={{
              textField: {
                size: 'small',
              },
            }}
          />

          <TextField
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            size='small'
            label={translate('address')}
            placeholder={translate('address')}
          />
          <div className='flex justify-between'>
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
          </div>

          <Button variant='contained' onClick={logup}>
            {translate('sign-up')}
          </Button>
          <div>{translate('or')}</div>
          <Button
            onClick={handleGoogleLogin}
            sx={{
              backgroundColor: 'red',
              ':hover': {
                backgroundColor: 'red',
              },
            }}
            variant='contained'
          >
            <FontAwesomeIcon size='xl' className='mr-2' icon={faGoogle} />{' '}
            {translate('login-with-google')}
          </Button>
          <div className='mt-3'>
            <span>
              {translate('have-account')}?{' '}
              <Link to={authRoutes.login}>{translate('sign-in')}</Link>
            </span>
          </div>
        </Paper>
      </div>
    );
  };

  return render();
};

export default SignUpPage;
