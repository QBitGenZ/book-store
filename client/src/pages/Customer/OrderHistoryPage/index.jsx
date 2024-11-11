import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getAllOrderRequestStart, } from '~/redux/order/slice';
import OrderedSummary from '~/pages/Customer/OrderHistoryPage/Components/OrderedSummary';
import { CustomerPagination, } from '~/components';
import { translate, } from '~/helpers';
import { clientRoutes, } from '~/configs/routes';
import { useNavigate, } from 'react-router-dom';

const OrderHistoryPage = () => {
  const { orders, meta, } = useSelector((state) => state.order);
  const [orderBy,] = React.useState('');
  const [descending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit,] = React.useState(5);

  const dispatch = useDispatch();
  const nav = useNavigate();

  const goToHome = () => {
    nav(clientRoutes.home);
  };

  React.useEffect(() => {
    dispatch(
      getAllOrderRequestStart({
        orderBy,
        page,
        limit,
        descending,
      })
    );
    // console.log(orders, meta);
  }, [dispatch, page,]);

  return (
    <>
      {orders?.map((order, index) => (
        <div className={'mb-3'} key={index}>
          <OrderedSummary order={order} shippingCost={order?.delivery?.cost} />
        </div>
      ))}
      {orders.length > 0 ? (
        <CustomerPagination
          currentPage={meta?.page ?? 1}
          totalPages={meta?.totalPage ?? 1}
          onPageChange={setPage}
        />
      ) : (
        <div
          className={
            'rounded shadow-sm bg-white w-full flex flex-col items-center p-16'
          }
        >
          <p>{translate('Không có đơn hàng trước đó')}</p>
          <button
            className='w-fit py-2 px-4 rounded shadow-md bg-red-600 text-white font-semibold mt-4'
            onClick={goToHome}
          >
            {translate('Về Trang chủ')}
          </button>
        </div>
      )}
    </>
  );
};

export default OrderHistoryPage;
