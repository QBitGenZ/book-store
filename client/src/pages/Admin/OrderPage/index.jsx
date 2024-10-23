import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { DataTable, Pagination, } from '~/components'; // Assuming you have these components like in ProductTypePage
import { getAllByAdminRequestStart, } from '~/redux/order/slice';
import { formatCurrency, translate, } from '~/helpers';

const OrderPage = () => {
  const dispatch = useDispatch();
  const { orders, meta, } = useSelector((state) => state.order);

  const [orderBy, setOrderBy,] = React.useState('');
  const [descending, setDescending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit, setLimit,] = React.useState(5);

  React.useEffect(() => {
    dispatch(getAllByAdminRequestStart({
      orderBy,
      page,
      limit,
      descending,
    }));
  }, [dispatch, orderBy, page, limit, descending,]);

  const render = () => (
    <>
      <div className='flex flex-col'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>
          {translate('orders')}
        </div>
        <div className='flex flex-row w-full justify-between gap-3'>
          <div className='rounded-xl p-3 bg-white w-full'>
            <DataTable
              columns={[
                {
                  field: 'id',
                  enableSort: false,
                  label: translate('#'),
                },
                {
                  field: 'user',
                  enableSort: false,
                  label: translate('user'),
                },
                {
                  field: 'address',
                  enableSort: false,
                  label: translate('address'),
                },
                {
                  field: 'totalPrice',
                  enableSort: true,
                  label: translate('total-price'),
                },
                {
                  field: 'payment',
                  enableSort: false,
                  label: translate('payment'),
                },
                {
                  field: 'paymentDate',
                  enableSort: true,
                  label: translate('payment-date'),
                },
                {
                  field: 'createdAt',
                  enableSort: true,
                  label: translate('created-at'),
                },
              ]}
              data={orders?.map((order) => ({
                ...order,
                'id': order._id,
                'user': order.user, // Assuming this will map to a user ID or name
                'address': order.address,
                'totalPrice': `${formatCurrency(order.totalPrice)}`, // Formatting currency
                'payment': order.payment, // Payment ID or method
                'paymentDate': order.paymentDate ? new Date(order.paymentDate).toLocaleDateString() : '',
                'createdAt': new Date(order.createdAt).toLocaleDateString(),
              }))}
              keyField='_id'
              onSort={(field, des) => {
                setOrderBy(field);
                setDescending(des === 'desc');
              }}
            />

            <Pagination
              count={meta?.totalPage}
              page={page}
              rowsPerPage={limit}
              setPage={setPage}
              setRowsPerPage={setLimit}
            />
          </div>
        </div>
      </div>
    </>
  );

  return render();
};

export default OrderPage;
