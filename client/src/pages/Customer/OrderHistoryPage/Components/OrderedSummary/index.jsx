import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { formatCurrency, translate, } from '~/helpers';
import { useDispatch, useSelector, } from 'react-redux';
import { updateOrderRequestStart, } from '~/redux/order/slice';
import { getDeliveryStatusesRequestStart, } from '~/redux/deliveryStatus/slice';
import { clientRoutes, } from '~/configs/routes';
import { useNavigate, } from 'react-router-dom';

function OrderedSummary({ order, shippingCost = 0, }) {
  const items = order.items;
  const { shop, } = useSelector((state) => state.config);
  const { deliveryStatuses, } = useSelector((state) => state.deliveryStatus);
  const [showAllItems, setShowAllItems,] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const goToOrder = (order) => {
    nav(clientRoutes.orderDetail.replace(':id', order._id), {
      state: order,
    });
  };

  const calSubTotal = () => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calSubTotal();
    return subtotal + shippingCost;
  };

  const getDeliveryStatus = () => {
    dispatch(
      getDeliveryStatusesRequestStart({
        limit: 1000,
        page: 1,
      })
    );
  };

  const updateDelivery = (id, deliveryStatus) => {
    if (!deliveryStatus) return;
    const data = {

    };

    data.deliveryStatus = deliveryStatuses.find(item => item.name === deliveryStatus)._id;

    dispatch(
      updateOrderRequestStart({
        id,
        data: JSON.stringify(data),
      })
    );
  };

  React.useEffect(() => {
    getDeliveryStatus();
  }, [dispatch,]);

  return (
    <div className='space-y-4 p-4 rounded-lg bg-white border shadow-sm'>
      <div className={'flex flex-row justify-between'}>
        <h2 className='font-semibold text-lg text-left'>
          {order?.deliveryStatus?.name}
        </h2>
        {order?.deliveryStatus?.name === 'Đang trên đường giao đến bạn' && (
          <button
            onClick={() => updateDelivery(order._id, 'Đã nhận hàng')}
            className={`left-0 border-2 border-[${shop?.accentColor}] text-white p-2 rounded text-sm font-semibold`}
            style={{
              backgroundColor: shop?.accentColor || '#0065D7',
            }}
          >
            {translate('Đã nhận hàng')}
          </button>
        )}
      </div>
      <div className='border rounded p-4 flex flex-col'>
        {/* Conditionally display items based on showAllItems */}
        {(showAllItems ? items : items.slice(0, 2)).map((item) => (
          <div onClick={() => goToOrder(order)} key={item._id} className='flex gap-3 border-b-[1px] py-3'>
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
              <h6 className='text-left'>{item.product.name}</h6>
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

        {/* Toggle message for displaying more or fewer items */}
        {items.length > 2 && (
          <div
            className='text-gray-500 text-sm mt-2 text-left p-2 border rounded w-fit cursor-pointer'
            onClick={() => setShowAllItems(!showAllItems)}
          >
            {showAllItems
              ? `Ẩn bớt ${items.length - 2} sản phẩm`
              : `Xem thêm ${items.length - 2} sản phẩm`}
          </div>
        )}

        {/* Types Total */}
        <div className={'flex justify-end'}>
          <table className='border-collapse w-fit '>
            <tbody className={'w-max'}>
              <tr className='pr-4 py-0.5 sm:grid sm:grid-cols-2 sm:px-0'>
                <td className='text-right text-base text-gray-500'>
                Phí vận chuyển
                </td>
                <td className='text-right text-base text-gray-500'>
                  {formatCurrency(shippingCost)}
                </td>
              </tr>
              <tr className='pr-4 py-0.5 sm:grid sm:grid-cols-2 sm:px-0 font-semibold'>
                <td className='text-right'>Tổng Tiền</td>
                <td className='text-right text-orange-500'>
                  {formatCurrency(calculateTotal())}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          onClick={() => goToOrder(order)}
          className={'left-0 border-2  p-2 rounded text-sm font-semibold'}
          style={{
            border: shop?.accentColor || '#0065D7',
            color: shop?.accentColor || '#0065D7',
          }}
        >
          {translate('detail')}
        </button>
      </div>
    </div>
  );
}

OrderedSummary.propTypes = {
  order: PropTypes.object.isRequired,
  shippingCost: PropTypes.number.isRequired,
};

export default OrderedSummary;
