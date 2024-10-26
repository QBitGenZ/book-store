import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getAllOrderRequestStart, } from '~/redux/order/slice';
import OrderedSummary from '~/pages/Customer/OrderHistoryPage/Components/OrderedSummary';

const OrderHistoryPage = () => {
  const { orders, meta, } = useSelector(state => state.order);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllOrderRequestStart());
    console.log(orders, meta);
  }, [dispatch,]);

  return (
    <>
      {orders?.map((order, index) => (
        <div
          className={'mb-3'}
          key={index}>

          <OrderedSummary
            order={order}
            shippingCost={order?.delivery?.cost}
          />
        </div>
      ))}
    </>
  );
};

export default OrderHistoryPage;
