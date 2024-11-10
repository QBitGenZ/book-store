import React, { useState, } from 'react';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash, } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { formatCurrency, } from '~/helpers';
import { useNavigate, } from 'react-router-dom';
import { clientRoutes, } from '~/configs/routes';

const CartItem = ({ cartItem, handleUpdateItem, handleDeleteItem, }) => {
  const nav = useNavigate();
  const [quantity, setQuantity,] = useState(cartItem?.quantity || 1);
  const [isCheck, setIsCheck,] = React.useState(cartItem?.checked || false);

  const handleIncrement = () => {
    setQuantity((prev) => {
      if (prev < cartItem?.product?.stockQuantity) {
        const newQuantity = prev + 1;
        handleUpdateItem(cartItem?.product?._id, newQuantity, isCheck);
        return newQuantity;
      }
      return prev;
    });
  };

  const handleDecrement = () => {
    setQuantity((prev) => {
      if (prev > 1) {
        const newQuantity = prev - 1;
        handleUpdateItem(cartItem?.product?._id, newQuantity, isCheck);
        return newQuantity;
      }
      return prev;
    });
  };

  const deleteItem = () => {
    handleDeleteItem(cartItem?.product?._id);
  };

  const handleCheckChange = (e) => {
    const checked = e.target.checked;
    setIsCheck(checked);
    handleUpdateItem(cartItem?.product?._id, quantity, checked);
  };

  const handleNavItem = () => {
    nav(clientRoutes.product.replace(':id', cartItem?.product?._id));
  };
  // const handleCheckChange = (e) => {
  //   setIsCheck(e.target.checked);
  //   selectItem(cartItem, e.target.checked);
  //
  // };

  React.useEffect(() => {
    setIsCheck(cartItem.checked);
  }, [cartItem.checked,]);

  return (
    <div className='flex justify-between items-center border-b py-4'>
      <div className='flex items-start gap-3 w-2/5'>
        <div className='flex content-center h-max'>
          <input
            type='checkbox'
            checked={isCheck}
            onChange={handleCheckChange}
            className=' w-4 h-4 accent-blue-500'
          />
        </div>
        <div className='flex items-start gap-3 w-full' onClick={handleNavItem}>
          {cartItem?.product?.images?.[0] ? (
            <img
              src={`${process.env.REACT_APP_HOST_IP}/${cartItem?.product?.images?.[0]}`}
              alt={cartItem?.product?.name}
              className='w-20 h-24 object-cover'
            />
          ) : (
            <img
              src={`${process.env.PUBLIC_URL}/assets/pages/other/noImageItem.jpg`}
              alt='Product'
              className='w-20 h-24 object-cover'
            />
          )}

          {/* Product Details */}
          <div>
            <div className='flex items-center'>
              <span className='font-normal break-words text-left'>
                {cartItem?.product?.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={'w-1/2 flex justify-between'}>
        {/* Price */}
        <div className='font-semibold text-sm w-full content-center'>
          {formatCurrency(cartItem?.product?.price)}
        </div>

        {/* Quantity Selector */}
        <div className='flex items-center space-x-2 w-full content-center'>
          <button
            onClick={handleDecrement}
            className='border px-2 py-1 rounded'
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <input
            type='text'
            value={quantity}
            readOnly
            className='w-10 text-center border py-1 rounded'
          />
          <button
            onClick={handleIncrement}
            className='border px-2 py-1 rounded'
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {/* total Price */}
        <div className='text-red-500 font-bold w-full content-center'>
          {formatCurrency(cartItem?.product?.price * quantity)}
        </div>

        {/* Delete Icon */}
        <button
          className='text-gray-500 hover:text-red-500 w-full content-center'
          onClick={deleteItem}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object,
  handleUpdateItem: PropTypes.func,
  handleDeleteItem: PropTypes.func,
  // allCheck: PropTypes.bool,
  // selectItem: PropTypes.func,
};

export default CartItem;
