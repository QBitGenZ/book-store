import React, { useState, } from 'react';
import PropTypes from 'prop-types';
// import { useSelector, } from 'react-redux';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, } from '@fortawesome/free-solid-svg-icons';
import { useSelector, } from 'react-redux';
// import ImageGallery from 'react-image-gallery';

const ProductImage = ({ product, }) => {
  const [selectedImage, setSelectedImage,] = useState(
    product?.images[0] || null
  );
  const { shop, } = useSelector((state) => state.config);

  const [startIndex, setStartIndex,] = useState(0);
  const [endIndex, setEndIndex,] = useState(5);
  const [isFullScreen, setIsFullScreen,] = useState(false);

  const handleProductChange = (image) => {
    setSelectedImage(image);
  };
  const handleShowAfter = () => {
    if (endIndex < product.images.length) {
      setEndIndex(endIndex + 1);
      setStartIndex(startIndex + 1);
    }
  };

  const handleShowBefore = () => {
    if (startIndex > 0) {
      setEndIndex(endIndex - 1);
      setStartIndex(startIndex - 1);
    }
  };

  const openFullscreen = (id) => {

    setIsFullScreen(true);
    document.getElementById(id)?.requestFullscreen({
      navigationUI: 'show',
    });
  };

  const closeFullscreen = () => {
    setIsFullScreen(false);
    document.exitFullscreen();
  };

  const fullscreenchangeHandler = () => {
    if (document.fullscreenElement) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('fullscreenchange', fullscreenchangeHandler);
    return () => {
      window.removeEventListener('fullscreenchange', fullscreenchangeHandler);
    };
  },[isFullScreen,]);

  React.useEffect(() => {
    setSelectedImage(product?.images[0] || null);
  }, [product,]);

  return (
    <div
      className={
        'flex flex-col gap-3 w-max p-4 m-auto rounded shadow-sm sticky top-0 bg-white h-full'
      }
      id={'imageslider'}
    >
      <div className={` flex flex-col border rounded-lg p-1 bg-white ${isFullScreen ? 'w-full h-[90%]' : ''}`}>
        {product?.images.length > 0 ? (
          <img
            src={`${process.env.REACT_APP_HOST_IP}/${selectedImage}`}
            alt='Product'
            className={`${isFullScreen ? 'w-full h-full' : 'size-[22rem]'} object-contain`}
            id={selectedImage}
          />
        ) : (
          <img
            src={`${process.env.PUBLIC_URL}/assets/pages/other/noImageItem.jpg`}
            alt='Product'
            className='size-80 object-contain'
          />
        )}
        {!isFullScreen ? (
          <div className={'absolute justify-self-end'} onClick={() => openFullscreen('imageslider')}>
            <svg className={'size-6 justify-self-end mb-1 mr-1'} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'
              stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path
                d='M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3'></path>
            </svg>
          </div>
        ) : (
          <div className={' absolute justify-self-end'} onClick={() => closeFullscreen()}>
            <svg className={'size-6 justify-self-end mb-1 mr-1'} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'
              stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path
                d='M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3'></path>
            </svg>
          </div>
        )}
      </div>

      <div className='flex flex-row gap-1 justify-center items-center'>
        <div>
          {startIndex > 0 && (
            <FontAwesomeIcon
              className={'pr-0.5'}
              icon={faAngleLeft}
              onClick={handleShowBefore}
            />
          )}
        </div>
        {product?.images?.slice(startIndex, endIndex).map((image, index) => (
          <img
            key={index}
            src={`${process.env.REACT_APP_HOST_IP}/${image}`}
            alt={`Thumbnail ${index + 1}`}
            className={`size-14 p-0.5 object-contain cursor-pointer rounded ${image === selectedImage ? 'border-2' : 'border'}`}
            style={
              image === selectedImage
                ? {
                  borderColor: shop?.accentColor,
                }
                : {
                }
            }
            onClick={() => handleProductChange(image)}
          />
        ))}
        <div>
          {endIndex < product?.images?.length && (
            <FontAwesomeIcon
              className={'pl-0.5'}
              icon={faAngleRight}
              onClick={handleShowAfter}
            />
          )}
        </div>
      </div>

    </div>
  );

};

ProductImage.propTypes = {
  product: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ProductImage;
