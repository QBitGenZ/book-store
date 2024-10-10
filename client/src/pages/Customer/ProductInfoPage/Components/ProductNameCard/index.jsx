import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, } from 'react-redux';
import { getAuthorsRequestStart, } from '~/redux/author/slice';

const ProductNameCard = ({ product, }) => {

  const { authors, } = useSelector(state => state.author);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAuthorsRequestStart());
  }, [dispatch,]);

  return (
    <div className='p-6 rounded max-w-full h-auto bg-white shadow-sm flex flex-col gap-2'>

      <div className='text-left text-2xl font-medium'>
        {product?.name}
      </div>

      <div className='text-left text-sm text-gray-500'>
                Tác giả: {authors.find((author) => author._id === product?.author)?.fullname}
      </div>

    </div>
  );
};

ProductNameCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductNameCard;
