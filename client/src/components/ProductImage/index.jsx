import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { useSelector, } from 'react-redux';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, } from '@fortawesome/free-solid-svg-icons';

const ProductImage = ({ product, }) => {
  const [selectedImage, setSelectedImage,] = useState(product?.images[0] || null);
  const { shop, } = useSelector((state) => state.config);

  const [startIndex, setStartIndex,] = useState(0);
  const [endIndex, setEndIndex,] = useState(5);

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

  React.useEffect(() => {
    setSelectedImage(product?.images[0] || null);
  }, [product,]);

  return (
    <div className={'flex flex-col gap-3 w-max bg-white p-4 m-auto rounded shadow-sm sticky top-0'}>
      <div className='bg-white border rounded-lg p-1'>
        {product?.images.length > 0 ? (
          <img
            src={`${process.env.REACT_APP_HOST_IP}/${selectedImage}`}
            alt='Product'
            className='size-[22rem] object-contain'
          />
        ) : (
          <img
            src={`${process.env.PUBLIC_URL}/assets/pages/other/noImageItem.jpg`}
            alt='Product'
            className='size-80 object-contain'
          />
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
            style={image === selectedImage ? {
              borderColor: shop?.accentColor,
            } : {
            }}

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

      {/* <div*/}
      {/*  className={'relative snap-x overflow-x-auto snap-mandatory scrollbar-hidden flex flex-row gap-1'}>*/}
      {/*  {data?.images?.map((image, index) => (*/}
      {/*    <div className={'snap-start shrink-0'} key={index}>*/}
      {/*      <img*/}
      {/*        key={index}*/}
      {/*        src={`${process.env.REACT_APP_HOST_IP}/${image}`}*/}
      {/*        alt={`Thumbnail ${index + 1}`}*/}
      {/*        className={`w-16 h-16 p-0.5 object-contain cursor-pointer rounded ${image === selectedImage ? 'border-2' : 'border'}`}*/}
      {/*        style={image === selectedImage ? {*/}
      {/*          borderColor: shop?.accentColor,*/}
      {/*        } : {*/}
      {/*        }}*/}

      {/*        onClick={() => handleProductChange(image)}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  ))}*/}

      {/* </div>*/}
    </div>
  );
};

ProductImage.propTypes = {
  product: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ProductImage;
