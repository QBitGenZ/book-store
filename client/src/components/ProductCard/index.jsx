import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, } from 'react-router-dom';
import { clientRoutes, } from '~/configs/routes';
import { formatCurrency, translate, } from '~/helpers';

const ProductCard = ({ product, }) => {
  const navigate = useNavigate();
  // const { shop, } = useSelector(state => state.config);

  const handleNavigate = () => {
    if (product?.isEbook)
      navigate(clientRoutes.ebook.replace(':id', product._id));
    else
      navigate(clientRoutes.product.replace(':id', product._id));
  };

  return (
    <div className='relative flex w-full max-w-56 h-[350px] flex-col overflow-hidden bg-white hover:shadow-xl transition-shadow duration-200 rounded'>
      <div
        className='relative mx-3 mt-3 flex justify-center overflow-hidden rounded cursor-pointer'
        onClick={handleNavigate}
      >
        {product?.images?.length > 0 ? (
          <img
            src={`${process.env.REACT_APP_HOST_IP}/${product.images[0]}`}
            alt={`${product.name}`}
            className='size-48 object-fit-contain aspect-square '
          />
        ) : (
          <img
            src={`${process.env.PUBLIC_URL}/assets/pages/other/noImageItem.jpg`}
            alt='Product'
            className='size-48 object-fit-contain aspect-square'
          />
        )}
      </div>
      <div className='flex flex-col justify-start mt-2 mx-2 px-2 pb-2'>
        <div onClick={handleNavigate} className='cursor-pointer'>
          <div className='text-pretty text-start text-sm  truncate font-normal line-clamp-2  h-[calc(2*1.25rem)]'>
            {product?.name}
          </div>
        </div>

        {product?.stockQuantity === 0 ? (
          <div className='mb-3 mt-1 flex items-center justify-between'>
            <span
              className='inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10'>
              {translate('sold-out')}
            </span>
          </div>
        )
          :
          (
            <div className='mt-1 flex items-center justify-between'>
              <div className='font-bold text-base text-red-500'>
                {formatCurrency(product?.price)}
              </div>
            </div>
          )}

      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    price: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    isEbook: PropTypes.bool,
    stockQuantity: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
