import React from 'react';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { Avatar, } from '@files-ui/react';
import { QuiltedImageList, } from '~/components';
import { Button, } from '@mui/material';
import { deletePhotoRequestStart,
  updateShopRequestStart, } from '~/redux/config/slice';
import { useDispatch, } from 'react-redux';

const PhotoInfo = ({ shop, }) => {
  const [imageSource, setImageSource,] = React.useState(
    `${process.env.REACT_APP_HOST_IP}/${shop?.poster}` || null
  );

  const dispatch = useDispatch();

  const handleChangeSource = (selectedFile) => {
    setImageSource(selectedFile);
  };

  const handleAddImages = (photos) => {
    const form = new FormData();
    if (photos != [])
      photos?.forEach((photo) => {
        form.append('images', photo.file);
      });
    dispatch(updateShopRequestStart(form));
  };

  const handleUpdatePoster = () => {
    const form = new FormData();

    if (
      imageSource &&
      imageSource != `${process.env.REACT_APP_HOST_IP}/${shop?.poster}`
    )
      form.append('poster', imageSource);

    dispatch(updateShopRequestStart(form));
  };

  const handleRemovePhoto = (photo) => {
    // dispatch(deletePhotoRequestStart(photo?.img?.split('/')[4]));
    dispatch(
      deletePhotoRequestStart(
        JSON.stringify({
          field: 'images',
          image: photo?.img?.split('/')[4],
        })
      )
    );
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='rounded-xl p-3 bg-white w-full'>
        <div className='text-left text-gray-500 font-bold mb-10'>
          {translate('poster')}
        </div>
        <div className='flex flex-col justify-between'>
          <div className='w-full max-w-full'>
            <Avatar
              src={imageSource}
              alt='Avatar'
              onChange={handleChangeSource}
              variant='square'
              emptyLabel={shop?.name}
              changeLabel={shop?.name}
              style={{
                width: '100%',
              }}
            />
          </div>
          <div className='text-left mt-4'>
            <Button onClick={handleUpdatePoster} variant='contained'>
              {translate('save')}
            </Button>
          </div>
        </div>
      </div>
      <div className='rounded-xl p-3 bg-white w-full'>
        <div className='text-left text-gray-500 font-bold mb-10'>
          {translate('images')}
        </div>
        <div className='flex justify-between'>
          <div className='w-full max-w-full'>
            <QuiltedImageList
              itemData={shop?.images?.map((value) => ({
                img: `${process.env.REACT_APP_HOST_IP}/${value}`,
              }))}
              actions={[
                {
                  label: translate('remove-image'),
                  func: handleRemovePhoto,
                },
              ]}
              onAddImages={handleAddImages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

PhotoInfo.propTypes = {
  shop: PropTypes.object.isRequired,
};

export default PhotoInfo;
