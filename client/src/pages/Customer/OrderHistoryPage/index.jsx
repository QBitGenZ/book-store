import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getAllOrderRequestStart, } from '~/redux/order/slice';
import OrderedSummary from '~/pages/Customer/OrderHistoryPage/Components/OrderedSummary';
import { CustomerPagination, } from '~/components';

const OrderHistoryPage = () => {
  const { orders, meta, } = useSelector(state => state.order);
  const [orderBy, ,] = React.useState('');
  const [descending, ,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit, ,] = React.useState(5);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllOrderRequestStart({
      orderBy,
      page,
      limit,
      descending,
    }));
    // console.log(orders, meta);
  }, [dispatch, page,]);

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
      <CustomerPagination
        currentPage={meta?.page ?? 1}
        totalPages={meta?.totalPage ?? 1}
        onPageChange={setPage}
      />
    </>
  );
};

export default OrderHistoryPage;
