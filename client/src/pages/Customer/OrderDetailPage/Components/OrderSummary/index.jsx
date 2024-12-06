import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency, formatDate, } from '~/helpers';
import { useDispatch, useSelector, } from 'react-redux';
import { getAddressRequestStart, resetAddressStates, } from '~/redux/address/slice';

function OrderSummary({ order, shippingCost = 0, }) {
  const dispatch = useDispatch();
  const calSubTotal = () => {
    return order?.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ) || 0;
  };
  const calculateTotal = () => {
    const subtotal = calSubTotal();
    return subtotal + shippingCost;
  };
  const { address, } = useSelector((state) => state.address);
  const getAddress = (id) => {
    dispatch(getAddressRequestStart(id));
  };
  React.useEffect(() => {
    getAddress(order.address);
  }, [dispatch,]);

  React.useState(() => {
    dispatch(resetAddressStates());
  }, [dispatch, address,]);

  return (
    <div
      className={'flex flex-col gap-3'}
      style={{
        fontFamily: 'Inter, san-serif',
        fontSize: '14px',
      }}>

      <div className={'text-left text-xs px-4 mt-4'}>
        <h6 className='font-semibold text-lg text-left'>Chi tiết đơn hàng #{order?._id}</h6>
        <p className={'normal-case mb-0'}>Ngày đặt hàng: {formatDate(order?.createdAt)}</p>
      </div>
      <div className={'flex md:flex-row flex-col gap-3 text-xs w-full'}>
        <div className='space-y-4 p-4 rounded bg-white flex flex-col text-left w-full'>
          <div className={'space-y-4'}>
            <span className={'uppercase'}>Địa chỉ người nhận</span>
            {address ? (
              <div className={'flex flex-col '}>
                {address?.name && (<div className={'uppercase font-bold'}>{address?.name}</div>)}
                {address?.addressDetail && (<div>Địa chỉ: {address.addressDetail}</div>)}
                {address?.phone && (<div>Điện thoại {address.phone}</div>)}
              </div>
            )
              :
              (<div>{order?.address}</div>)}
          </div>

        </div>
        <div className='space-y-4 p-4 rounded bg-white flex flex-col text-left w-full'>
          <div className={'space-y-4'}>
            <span className={'uppercase'}>Hình thức giao hàng</span>
            <div>
              <div className={'font-bold'}>{order?.delivery?.name}</div>
              <div className={'font-light italic pl-2'}>{order?.delivery?.description}</div>
            </div>
          </div>
          <div className={'space-y-4'}>
            <span className={'uppercase'}>Hình thức thanh toán</span>
            <div>
              <div className={'font-bold'}>{order?.payment.name}</div>
            </div>
          </div>
        </div>

        <div className='space-y-4 p-4 rounded bg-white text-left w-full'>
          <div className={'space-y-4'}>
            <span className={'uppercase'}>Trạng thái giao hàng</span>
            <div>
              <div className={'font-bold'}>{order?.deliveryStatus?.name}</div>
            </div>
          </div>
          <div className={'space-y-4'}>
            <span className={'uppercase'}>Trạng thái thanh toán</span>
            <div>
              <div className={'font-bold'}>{order?.paymentStatus?.name}</div>
              {/* <div className={'font-light italic pl-2'}>{order?.delivery.description}</div>*/}
            </div>
          </div>
        </div>
      </div>
      <div className='space-y-4 p-4 rounded bg-white'>
        <div className='border rounded p-4 flex flex-col'>
          {order?.items.map((item) => (
            <div key={item._id} className='flex gap-3 py-3 border-b-[1px]'>
              {/* <img src={item.product.image[0]} alt={item.name} className='w-20'/>*/}
              {item?.product?.images[0] ? (
                <img
                  src={`${process.env.REACT_APP_HOST_IP}/${item.product.images[0]}`}
                  alt='Product'
                  className='w-20 h-24 p-0.5 object-contain aspect-square border rounded'
                />
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/assets/pages/other/noImageItem.jpg`}
                  alt='Product'
                  className='w-20 h-24 p-0.5 object-contain aspect-square border rounded'
                />
              )}
              <div className='flex-1'>
                <h6 className={'text-left'}>{item.product.name}</h6>
                <div className='flex justify-between items-center mt-2'>
                  <div className='space-y-1'>
                    <p className='text-red-500'>
                      {formatCurrency(item.product.price)}
                    </p>
                  </div>
                  <span>x {item.quantity}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Types Total */}
          <div className='mt-6 space-y-2'>
            <div className='flex justify-between'>
              <span>Thành tiền</span>
              <span>{formatCurrency(calSubTotal())}</span>
            </div>
            <div className='flex justify-between'>
              <span>Phí vận chuyển</span>
              <span>{formatCurrency(shippingCost)}</span>
            </div>
            <div className='flex justify-between font-semibold pt-2 border-t'>
              <span>Tổng Số Tiền</span>
              <span className='text-orange-500'>
                {formatCurrency(calculateTotal())}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

OrderSummary.propTypes = {
  order: PropTypes.object.isRequired,
  shippingCost: PropTypes.number.isRequired,
};

export default OrderSummary;
