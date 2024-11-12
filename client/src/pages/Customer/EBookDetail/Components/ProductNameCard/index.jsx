import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, } from 'react-redux';
import { getAuthorsRequestStart, } from '~/redux/author/slice';
import { translate, } from '~/helpers';
import { useNavigate, } from 'react-router-dom';
import { clientRoutes, } from '~/configs/routes';

const ProductNameCard = ({ product, }) => {
  const { authors, } = useSelector((state) => state.author);
  const { shop, } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(getAuthorsRequestStart());
  }, [dispatch,]);

  const readBook = () => {
    navigate(clientRoutes.readEbook.replace(':id', product._id));
  };

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

      {/* <div>*/}
      {/*  <span className='block text-left text-3xl font-bold text-red-500'>*/}
      {/*    {formatCurrency(product?.price)}*/}
      {/*  </span>*/}
      {/* </div>*/}
      <div>
        <button
          type='button'
          onClick={readBook}
          className={`block border-2 mt-1 px-3 py-1 rounded text-left text-lg font-semibold text-[${shop.accentColor}] e`}
          style={{
            color: shop.accentColor,
            borderColor: shop.accentColor,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.backgroundColor = shop?.accentColor;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = shop.accentColor;
            e.currentTarget.style.borderColor = shop.accentColor;
            e.currentTarget.style.backgroundColor = 'white';
          }}
        >
          {translate('read-book')}
        </button>
      </div>
    </div>
  );
};

ProductNameCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductNameCard;
