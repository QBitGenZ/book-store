import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, } from 'react-redux';
import { getAuthorsRequestStart, } from '~/redux/author/slice';
import { formatCurrency, translate, } from '~/helpers';

const ProductNameCard = ({ product, }) => {
  const { authors, } = useSelector((state) => state.author);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAuthorsRequestStart());
  }, [dispatch,]);

  return (
    <div className='p-6 rounded max-w-full h-auto bg-white shadow-sm flex flex-col gap-2'>
      <div className='text-left text-2xl font-medium'>{product?.name}</div>

      <div className='text-left text-sm text-gray-500'>
        {translate('author')} :{' '}
        {authors.find((author) => author._id === product?.author)?.fullname}
      </div>

      <div className={'flex flex-row justify-start gap-2 '}>
        <div>{translate('remaining-quantity')}</div>
        <div className={'text-red-500'}>{product?.stockQuantity}</div>
      </div>

      <div>
        <span className='block text-left text-3xl font-bold text-red-500'>
          {formatCurrency(product?.price)}
        </span>
      </div>
    </div>
  );
};

ProductNameCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductNameCard;
