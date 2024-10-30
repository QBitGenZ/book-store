import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency, } from '~/helpers';

function OrderSummary({ items, shippingCost = 0, }) {
  const calSubTotal = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };
  const calculateTotal = () => {
    const subtotal = calSubTotal();
    return subtotal + shippingCost;
  };

  return (
    <div className='space-y-4 p-4 rounded-lg bg-white'>
      <h2 className='font-semibold text-lg text-left'>KIỂM TRA LẠI ĐƠN HÀNG</h2>
      <div className='border rounded p-4 flex flex-col'>
        {items.map((item) => (
          <div key={item._id} className='flex gap-4 border-b-[1px] py-3'>
            {/* <img src={item.product.image[0]} alt={item.name} className='w-20'/>*/}
            {item.product.images[0] ? (
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
              <h6 className={'text-left'}>{item.product.name}</h6>
              <div className='flex justify-between items-center mt-2'>
                <div className='space-y-1'>
                  <p className='text-red-500'>{formatCurrency(item.product.price)}</p>
                </div>
                <span>x {item.quantity}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Order Total */}
        <div className='mt-6 space-y-2'>
          <div className='flex justify-between'>
            <span>Thành tiền</span>
            <span>{formatCurrency(calSubTotal())}</span>
          </div>
          <div className='flex justify-between'>
            <span>Phí vận chuyển (Giao hàng tiêu chuẩn)</span>
            <span>{formatCurrency(shippingCost)}</span>
          </div>
          <div className='flex justify-between font-semibold pt-2 border-t'>
            <span>Tổng Số Tiền</span>
            <span className='text-orange-500'>{formatCurrency(calculateTotal())}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

OrderSummary.propTypes = {
  items: PropTypes.array.isRequired,
  shippingCost: PropTypes.number.isRequired,
};

export default OrderSummary;
