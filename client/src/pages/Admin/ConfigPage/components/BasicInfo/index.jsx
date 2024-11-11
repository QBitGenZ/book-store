import { Avatar, } from '@files-ui/react';
import { Button, TextField, } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { useDispatch, } from 'react-redux';
import { updateShopRequestStart, } from '~/redux/config/slice';

const BasicInfo = ({ shop, }) => {
  const dispatch = useDispatch();

  const [imageSource, setImageSource,] = React.useState(
    `${process.env.REACT_APP_HOST_IP}/${shop?.logo}` || null
  );
  const [name, setName,] = React.useState(shop?.name);
  const [slogan, setSlogan,] = React.useState(shop?.slogan);
  const [email, setEmail,] = React.useState(shop?.email);
  const [phone, setPhone,] = React.useState(shop?.phone);
  const [zalo, setZalo,] = React.useState(shop?.zalo);
  const [facebook, setFacebook,] = React.useState(shop?.facebook);
  const [address, setAddress,] = React.useState(shop?.address);

  const handleChangeSource = (selectedFile) => {
    setImageSource(selectedFile);
  };

  const handleSavePublicInfo = () => {
    const form = new FormData();

    if (name != shop?.name) form.append('name', name);
    if (slogan != shop?.glogan) form.append('slogan', slogan);
    if (
      imageSource &&
      imageSource != `${process.env.REACT_APP_HOST_IP}/${shop?.avatar}`
    )
      form.append('logo', imageSource);

    dispatch(updateShopRequestStart(form));
  };

  const handleSaveContactInfo = () => {
    const form = new FormData();

    if (phone != shop?.phone) form.append('phone', phone);
    if (email != shop?.email) form.append('email', email);
    if (facebook != shop?.facebook) form.append('facebook', facebook);
    if (zalo != shop?.zalo) form.append('zalo', zalo);
    if (address != shop?.address) form.append('address', address);

    dispatch(updateShopRequestStart(form));
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='rounded-xl p-3 bg-white w-full'>
        <div className='text-left text-gray-500 font-bold mb-10'>
          {translate('public-info')}
        </div>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-3 w-2/3'>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              size='small'
              label={translate('shop-name')}
              placeholder={translate('shop-name')}
            />
            <TextField
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              size='small'
              label={translate('slogan')}
              placeholder={translate('slogan')}
            />
          </div>
          <Avatar
            src={imageSource}
            alt='Avatar'
            onChange={handleChangeSource}
            variant='circle'
            emptyLabel={shop?.name}
            changeLabel={shop?.name}
            style={{
              width: '120px',
              height: '120px',
              transform: 'translateY(-20px) translateX(-30px)',
              objectFit: 'cover',
            }}
          />
        </div>
        <div className='text-left mt-4'>
          <Button variant='contained' onClick={handleSavePublicInfo}>
            {translate('save')}
          </Button>
        </div>
      </div>
      <div className='rounded-xl p-3 bg-white w-full'>
        <div className='text-left text-gray-500 font-bold mb-10'>
          {translate('contact-info')}
        </div>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-3 w-2/3'>
            <div className='w-full flex gap-3 justify-between'>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full'
                size='small'
                label={translate('email')}
                placeholder={translate('email')}
              />
              <TextField
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className='w-full'
                size='small'
                label={translate('phone')}
                placeholder={translate('phone')}
              />
            </div>
            <div className='w-full flex gap-3 justify-between'>
              <TextField
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className='w-full'
                size='small'
                label={translate('facebook')}
                placeholder={translate('facebook')}
              />
              <TextField
                value={zalo}
                onChange={(e) => setZalo(e.target.value)}
                className='w-full'
                size='small'
                label={translate('zalo')}
                placeholder={translate('zalo')}
              />
            </div>

            <TextField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              size='small'
              multiline
              label={translate('address')}
              placeholder={translate('address')}
            />
          </div>
        </div>
        <div className='text-left mt-4'>
          <Button onClick={handleSaveContactInfo} variant='contained'>
            {translate('save')}
          </Button>
        </div>
      </div>
    </div>
  );
};

BasicInfo.propTypes = {
  shop: PropTypes.object.isRequired,
};

export default BasicInfo;
