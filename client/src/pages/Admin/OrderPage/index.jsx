import React, { useState, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { ConfirmationModal, DataTable, Pagination, } from '~/components'; // Assuming you have these components like in ProductTypePage
import { getAllByAdminRequestStart,
  updateOrderRequestStart, } from '~/redux/order/slice';
import { formatCurrency, translate, } from '~/helpers';
import { useNavigate, } from 'react-router-dom';
import { adminRoutes, } from '~/configs/routes';
import UpdateOrder from './components/UpdateOrder';
import Dropdown from './components/Dropdown';
import { getDeliveryStatusesRequestStart, } from '~/redux/deliveryStatus/slice';
import { getPaymentStatusesRequestStart, } from '~/redux/paymentStatus/slice';

const OrderPage = () => {
  const dispatch = useDispatch();
  const { orders, meta, updateSuccess, } = useSelector((state) => state.order);
  const { deliveryStatuses, } = useSelector((state) => state.deliveryStatus);
  const { paymentStatuses, } = useSelector((state) => state.paymentStatus);

  const [orderBy, setOrderBy,] = React.useState('');
  const [descending, setDescending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit, setLimit,] = React.useState(5);
  const [showConfirm, setShowConfirm,] = useState(false);
  const [confirmAction, setConfirmAction,] = useState(() => () => {});
  const [confirmMessage, setConfirmMessage,] = useState('');
  const navigate = useNavigate();
  const [selectedObj, ] = useState(null);
  const [showUpdate, setShowUpdate,] = useState(false);
  // const [ deliveryStatus,] = React.useState(null);
  // const [ paymentStatus,] = React.useState(null);

  const handleDetail = (e) => {
    const serializableOrder = {
      ...e,
      deliveryStatus: e.deliveryStatus?.$$typeof === Symbol.for('react.element')
        ? e.deliveryStatus?.props?.selected
        : e.deliveryStatus,
      paymentStatus: e.paymentStatus?.$$typeof === Symbol.for('react.element')
        ? e.paymentStatus?.props?.selected
        : e.paymentStatus,
    };
    console.log(e);
    navigate(adminRoutes.detailOrder.replace(':id', e._id), {
      state: serializableOrder,
    });
  };

  const getDeliveryStatus = () => {
    dispatch(
      getDeliveryStatusesRequestStart({
        limit: 1000,
        page: 1,
      })
    );
  };

  const getPaymentStatus = () => {
    dispatch(
      getPaymentStatusesRequestStart({
        limit: 1000,
        page: 1,
      })
    );
  };

  React.useEffect(() => {

    dispatch(
      getAllByAdminRequestStart({
        orderBy,
        page,
        limit,
        descending,
      })
    );
    // console.log(deliveryStatus, paymentStatus);
  }, [dispatch, orderBy, page, limit, descending, updateSuccess,]);

  React.useEffect(() => {
    getDeliveryStatus();
    getPaymentStatus();
  }, []);

  const confirmOrder = (id, deliveryStatusData) => {
    setConfirmAction(() => () => {
      updateOrderRequest(id, deliveryStatusData);
      setShowConfirm(false);
      setShowUpdate(false);
    });
    setConfirmMessage('Are you sure you want to save these changes?');
    setShowConfirm(true);
  };

  const updateOrderRequest = (id, orderData) => {
    const data = {
    };

    if (orderData?.deliveryStatus) {
      data.deliveryStatus = orderData?.deliveryStatus;
    }
    if (orderData?.paymentStatus) {
      data.paymentStatus = orderData?.paymentStatus;
    }
    dispatch(
      updateOrderRequestStart({
        id,
        data: JSON.stringify(data),
      })
    );
  };

  const updatePayment = (id, paymentStatus) => {
    if (!paymentStatus) return;
    const data = {
      
    };
    data.paymentStatus = paymentStatus;
    // console.log(data);
    dispatch(
      updateOrderRequestStart({
        id,
        data: JSON.stringify(data),
      })
    );
  };
  const updateDelivery = (id, deliveryStatus) => {
    if (!deliveryStatus) return;
    const data = {

    };
    data.deliveryStatus = deliveryStatus;
    // console.log(data);
    dispatch(
      updateOrderRequestStart({
        id,
        data: JSON.stringify(data),
      })
    );
  };

  const render = () => (
    <>
      <ConfirmationModal
        body={confirmMessage}
        onConfirm={confirmAction}
        onHide={() => setShowConfirm(false)}
        title='Confirm'
        show={showConfirm}
      />
      <UpdateOrder
        setShow={setShowUpdate}
        show={showUpdate}
        updateOrder={confirmOrder}
        order={selectedObj}
      />
      <div className='flex flex-col h-full'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>
          {translate('orders')}
        </div>
        <div className='flex flex-row w-full justify-between gap-3 h-full overflow-visible'>
          <div className='rounded-xl p-3 bg-white w-full h-full overflow-visible'>
            <DataTable
              actions={[
                {
                  label: translate('detail'),
                  handler: handleDetail,
                },
                // {
                //   label: translate('update-order'),
                //   handler: updateOrder,
                // },
              ]}
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
                // {
                //   field: 'address',
                //   enableSort: false,
                //   label: translate('address'),
                // },
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
                // {
                //   field: 'paymentDate',
                //   enableSort: true,
                //   label: translate('payment-date'),
                // },
                {
                  field: 'createdAt',
                  enableSort: true,
                  label: translate('created-at'),
                },
                {
                  field: 'deliveryStatus',
                  enableSort: true,
                  label: translate('delivery-status'),
                },
                {
                  field: 'paymentStatus',
                  enableSort: true,
                  label: translate('payment-status'),
                },
              ]}
              data={orders?.map((order) => ({
                ...order,
                id: order._id,
                user: order.user?.fullname || '', // Assuming this will map to a user ID or name
                address: order.address,
                totalPrice: `${formatCurrency(order.totalPrice)}`, // Formatting currency
                payment: order.payment.name, // Payment ID or method
                paymentDate: order.paymentDate
                  ? new Date(order.paymentDate).toLocaleDateString()
                  : '',
                createdAt: new Date(order.createdAt).toLocaleDateString(),
                paymentStatus:
                  paymentStatuses?.find((item) => item._id === order?.paymentStatus)?.name !== 'Giao dịch thành công' ? (
                    <Dropdown selected={order?.paymentStatus} order={order} listOptions={paymentStatuses} updateOrder={updatePayment}/>
                  ) : 'Giao dịch thành công' ,
                deliveryStatus:
                  deliveryStatuses?.find((item) => item._id === order?.deliveryStatus)?.name !== 'Đã nhận hàng' ? (
                    <Dropdown selected={order?.deliveryStatus} order={order} listOptions={deliveryStatuses} updateOrder={updateDelivery}/>
                  ) : 'Đã nhận hàng',

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
