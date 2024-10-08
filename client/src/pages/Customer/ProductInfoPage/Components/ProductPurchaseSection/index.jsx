import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { formatCurrency, } from '~/helpers';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector, } from 'react-redux';
import { getShopRequestStart, } from '~/redux/config/slice';

const ProductPurchaseSection = ({ product, handleAddToCart, }) => {
  const [quantity, setQuantity,] = useState(1);
  const [price, setPrice,] = useState(product?.price || 0);
  const { shop, } = useSelector(state => state.config);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      setPrice(product?.price * newQuantity);
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        const newQuantity = prevQuantity - 1;
        setPrice(product?.price * newQuantity);
        return newQuantity;
      }
      return prevQuantity;
    });
  };

  React.useEffect(() => {
    setPrice(product?.price * quantity);
    if (!shop) {
      dispatch(getShopRequestStart());
    }
  }, [product?.price, quantity,]);

  return (
    <div className='border rounded-lg p-4 w-80 mx-auto bg-white'>

      <div className='mb-4'>
        <label className='block font-semibold mb-2 text-left'>Số Lượng</label>
        <div className='flex gap-2 items-center'>
          <button
            onClick={handleDecrement}
            // className='px-2 py-1 border border-gray-300 rounded-l focus:outline-none'
            className={'border border-gray-300 rounded px-2 py-1 focus:outline-none '}
          >
            <FontAwesomeIcon icon={faMinus}/>
          </button>
          <input
            type='text'
            value={quantity}
            readOnly
            className='py-1 w-12 text-center rounded border border-gray-300 focus:outline-none'
          />
          <button
            onClick={handleIncrement}
            // className='px-2 py-1 border border-gray-300 rounded-r focus:outline-none'
            className={'border border-gray-300 rounded px-2 py-1 focus:outline-none'}

          >
            <FontAwesomeIcon icon={faPlus}/>
          </button>
        </div>
      </div>

      <div className='mb-4'>
        <span className='block text-left text-sm'>Tạm tính</span>
        <span className='block text-left text-2xl font-bold'>
          {formatCurrency(price)}
        </span>
      </div>

      <div className={'flex flex-col gap-2'}>
        <button className='w-full py-2 rounded' style={{
          borderColor: shop?.accentColor,
          color: shop?.accentColor,
          borderWidth: '1px', // Add border width if it's missing
        }}>
                    Mua ngay
        </button>

        <button className='w-full py-2 rounded' onClick={() => handleAddToCart(product, quantity)} style={{
          borderColor: shop?.accentColor,
          color: shop?.accentColor,
          borderWidth: '1px', // Ensure border width is also set for consistency
        }}>
                    Thêm vào giỏ
        </button>
      </div>

    </div>

  );
};

ProductPurchaseSection.propTypes = {
  product: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default ProductPurchaseSection;
