import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency, } from '~/helpers';

function OrderedSummary({ order, shippingCost = 0, }) {
  const items = order.items;
  const calSubTotal = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    const subtotal = calSubTotal();
    return subtotal + shippingCost;
  };

  return (
    <div className='space-y-4 p-4 rounded-lg bg-white'>
      <h2 className='font-semibold text-lg text-left'>{order?.deliveryStatus?.name}</h2>
      <div className='border rounded p-4 flex flex-col'>
        {/* Display only the first 2 items */}
        {items.slice(0, 2).map((item) => (
          <div key={item._id} className='flex gap-4 border-b-[1px] py-3'>
            {/* <img*/}
            {/*  src={`${process.env.REACT_APP_HOST_IP}/${item.product.images[0]}`}*/}
            {/*  alt='Product'*/}
            {/*  className='w-20 h-24 object-cover'*/}
            {/* />*/}
            {item?.product?.images[0] ? (
              <img src={`${process.env.REACT_APP_HOST_IP}/${item.product.images[0]}`}
                alt='Product'
                className='w-20 h-24 object-cover'
              />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/assets/pages/other/noImageItem.jpg`}
                alt='Product'
                className='w-20 h-24 object-cover'
              />
            )}
            <div className='flex-1'>
              <h6 className='text-left'>{item.product.name}</h6>
              <div className='flex justify-between items-center mt-2'>
                <div className='space-y-1'>
                  <p className='text-red-500'>{formatCurrency(item.product.price)}</p>
                </div>
                <span>x {item.quantity}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Show a message if there are more than 2 items */}
        {items.length > 2 && (
          <div className='text-gray-500 text-sm mt-2 text-left'>
                        ...and {items.length - 2} more items
          </div>
        )}

        {/* Order Total */}
        {/* <div className='mt-6 space-y-2'>*/}
        {/*  <div className={'flex justify-end font-semibold'}>*/}
        {/*    <span>Phí vận chuyển</span>*/}
        {/*    <span className='ml-2 text-orange-500'>{formatCurrency(shippingCost)}</span>*/}
        {/*  </div>*/}
        {/*  <div className='flex justify-end font-semibold'>*/}
        {/*    <span>Tổng Tiền</span>*/}
        {/*    <span className='ml-2 text-orange-500'>{formatCurrency(calculateTotal())}</span>*/}
        {/*  </div>*/}
        {/* </div>*/}
        <div className='mt-6 flex flex-col gap-2 items-end'>
          <div className='grid grid-cols-2 gap-2 w-fit'>
            <span className='text-right'>Phí vận chuyển</span>
            <span className='text-right'>{formatCurrency(shippingCost)}</span>
          </div>
          <div className='grid grid-cols-2 gap-2 w-fit font-semibold'>
            <span className='text-right'>Tổng Tiền</span>
            <span className='text-right text-orange-500'>{formatCurrency(calculateTotal())}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

OrderedSummary.propTypes = {
  order: PropTypes.array.isRequired,
  shippingCost: PropTypes.number.isRequired,
};

export default OrderedSummary;
