import React, { useState, } from 'react';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash, } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { formatCurrency, } from '~/helpers';

const CartItem = ({ cartItem, handleUpdateItem, handleDeleteItem, }) => {
  const [quantity, setQuantity,] = useState(cartItem?.quantity || 1);

  const handleIncrement = () => {
    setQuantity(prev => {
      const newQuantity = prev + 1;
      handleUpdateItem(cartItem?.product?._id, newQuantity); // Immediately update
      return newQuantity; // Update state
    });
  };
  
  const handleDecrement = () => {
    setQuantity(prev => {
      if (prev > 1) {
        const newQuantity = prev - 1;
        handleUpdateItem(cartItem?.product?._id, newQuantity); // Immediately update
        return newQuantity; // Update state
      }
      return prev; // Do not decrement below 1
    });
  };

  const deleteItem = () => {
    handleDeleteItem(cartItem?.product?._id);
  };

  return (
    <div className='flex justify-between items-center border-b py-4'>
      <div className='flex items-start gap-4'>
        <img
          src={`${process.env.REACT_APP_HOST_IP}/${cartItem?.product?.images?.[0]}`}
          alt={cartItem?.product?.name}
          className='w-20 h-24 object-cover'
        />
        {/* Product Details */}
        <div>
          <div className='flex items-center'>
            <span className='font-normal'>{cartItem?.product?.name}</span>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className='font-semibold text-sm'>
        {formatCurrency(cartItem?.product?.price)}
      </div>

      {/* Quantity Selector */}
      <div className='flex items-center space-x-2'>
        <button
          onClick={handleDecrement}
          className='border px-2 py-1 rounded'
        >
          <FontAwesomeIcon icon={faMinus}/>
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
          <FontAwesomeIcon icon={faPlus}/>
        </button>
      </div>

      {/* total Price */}
      <div className='text-red-500 font-bold'>
        {formatCurrency(cartItem?.product?.price * quantity)}
      </div>

      {/* Delete Icon */}
      <button className='text-gray-500 hover:text-red-500' onClick={deleteItem}>
        <FontAwesomeIcon icon={faTrash}/>
      </button>
    </div>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object,
  handleUpdateItem: PropTypes.func,
  handleDeleteItem: PropTypes.func,
};

export default CartItem;
