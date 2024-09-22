import React from 'react';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { Button, } from '@mui/material';
import { useDispatch, } from 'react-redux';
import { updateShopRequestStart, } from '~/redux/config/slice';
import { ColorSelector, } from '~/components';

const Config = ({ shop, }) => {
  const dispatch = useDispatch();

  const [primaryColor, setPrimaryColor,] = React.useState(shop?.primaryColor);
  const [secondaryColor, setSecondaryColor,] = React.useState(shop?.secondaryColor);
  const [accentColor, setAccentColor,] = React.useState(shop?.accentColor);
  const [neutralColor, setNeutralColor,] = React.useState(shop?.neutralColor);
  const [primaryBackground, setPrimaryBackground,] = React.useState(shop?.primaryBackground);
  const [secondaryBackground, setSecondaryBackground,] = React.useState(shop?.secondaryBackground);
  const [accentBackground, setAccentBackground,] = React.useState(shop?.accentBackground);
  const [neutralBackground, setNeutralBackground,] = React.useState(shop?.neutralBackground);

  const handleSaveConfig = () => {
    const form = new FormData();
    if(primaryColor != shop?.primaryColor)
      form.append('primaryColor', primaryColor);
    if(secondaryColor != shop?.secondaryColor)
      form.append('secondaryColor', secondaryColor);
    if(accentColor != shop?.accentColor)
      form.append('accentColor', accentColor);
    if(neutralColor != shop?.neutralColor)
      form.append('neutralColor', neutralColor);
    if(primaryBackground != shop?.primaryBackground)
      form.append('primaryBackground', primaryBackground);
    if(secondaryBackground != shop?.secondaryBackground)
      form.append('secondaryBackground', secondaryBackground);
    if(accentBackground != shop?.accentBackground)
      form.append('accentBackground', accentBackground);
    if(neutralBackground != shop?.neutralBackground)
      form.append('neutralBackground', neutralBackground);
    dispatch(updateShopRequestStart(form));
  };

  return ( <div className='flex flex-col gap-3'>
    <div className='rounded-xl p-3 bg-white w-full'>
      <div className='text-left text-gray-500 font-bold mb-10'>{translate('color')}</div>
      <div className='flex justify-between'>
        <div className='w-fit'>
          <ColorSelector value={primaryColor} setValue={setPrimaryColor} />
          <div>{translate('primary-color')}</div>
        </div>
        <div className='w-fit'>
          <ColorSelector value={secondaryColor} setValue={setSecondaryColor} />
          <div>{translate('secondary-color')}</div>
        </div>
        <div className='w-fit'>
          <ColorSelector value={accentColor} setValue={setAccentColor} />
          <div>{translate('accent-color')}</div>
        </div>
        <div className='w-fit'>
          <ColorSelector value={neutralColor} setValue={setNeutralColor} />
          <div>{translate('neutral-color')}</div>
        </div>
      </div>
      <div className='text-left mt-4'>
        <Button onClick={handleSaveConfig} variant='contained'>{translate('save')}</Button>
      </div>
    </div>  
    <div className='rounded-xl p-3 bg-white w-full'>
      <div className='text-left text-gray-500 font-bold mb-10'>{translate('background')}</div>
      <div className='flex justify-between'>
        <div className='w-fit'>
          <ColorSelector value={primaryBackground} setValue={setPrimaryBackground} />
          <div>{translate('primary-background')}</div>
        </div>
        <div className='w-fit'>
          <ColorSelector value={secondaryBackground} setValue={setSecondaryBackground} />
          <div>{translate('secondary-background')}</div>
        </div>
        <div className='w-fit'>
          <ColorSelector value={accentBackground} setValue={setAccentBackground} />
          <div>{translate('accent-background')}</div>
        </div>
        <div className='w-fit'>
          <ColorSelector value={neutralBackground} setValue={setNeutralBackground} />
          <div>{translate('neutral-background')}</div>
        </div>
      </div>
      <div className='text-left mt-4'>
        <Button onClick={handleSaveConfig} variant='contained'>{translate('save')}</Button>
      </div>
    </div>      
  </div>);
};

Config.propTypes = {
  shop: PropTypes.object.isRequired,
};

export default Config;