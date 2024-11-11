import React from 'react';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import RichTextEditor from '~/components/RichTextEditor';
import { Button, } from '@mui/material';
import { useDispatch, } from 'react-redux';
import { updateShopRequestStart, } from '~/redux/config/slice';

const Description = ({ shop, }) => {
  const [content, setContent,] = React.useState(shop?.description);
  const dispatch = useDispatch();

  const handleSaveDescription = () => {
    const form = new FormData();
    if (content != shop?.description) form.append('description', content);
    dispatch(updateShopRequestStart(form));
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='rounded-xl p-3 bg-white w-full'>
        <div className='text-left text-gray-500 font-bold mb-10'>
          {translate('description')}
        </div>
        <div className='flex justify-between'>
          <div className='w-full max-w-full'>
            <RichTextEditor content={content} setContent={setContent} />
          </div>
        </div>
        <div className='text-left mt-4'>
          <Button onClick={handleSaveDescription} variant='contained'>
            {translate('save')}
          </Button>
        </div>
      </div>
    </div>
  );
};

Description.propTypes = {
  shop: PropTypes.object.isRequired,
};

export default Description;
