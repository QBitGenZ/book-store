import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { ConfirmationModal, DataTable, Pagination, } from '~/components';
import { translate, } from '~/helpers';
import { createPaymentStatusRequestStart,
  deletePaymentStatusRequestStart,
  getPaymentStatusesRequestStart,
  updatePaymentStatusRequestStart, } from '~/redux/paymentStatus/slice';
import CreatePaymentStatusModal from './components/CreatePaymentStatusModal';
import UpdatePaymentStatusModal from './components/UpdatePaymentStatusModal';
import { Button, } from '@mui/material';

const PaymentStatusPage = () => {
  const dispatch = useDispatch();
  const {
    paymentStatuses,
    meta,
    paymentStatus,
    updateSuccess,
    deleteSuccess,
    createSuccess,
  } = useSelector((state) => state.paymentStatus);

  const [orderBy, setOrderBy,] = React.useState('');
  const [descending, setDescending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit, setLimit,] = React.useState(5);
  const [selectedObj, setSelectedObj,] = React.useState(null);

  const [showCreate, setShowCreate,] = React.useState(false);
  const [showUpdate, setShowUpdate,] = React.useState(false);
  const [showConfirm, setShowConfirm,] = React.useState(false);
  const [confirmAction, setConfirmAction,] = React.useState(() => () => {
  });
  const [confirmMessage, setConfirmMessage,] = React.useState('');

  const getPaymentStatuses = () => {
    dispatch(
      getPaymentStatusesRequestStart({
        orderBy,
        page,
        limit,
        descending,
      })
    );
  };

  React.useEffect(() => {
    if (!paymentStatuses || paymentStatuses.length === 0 || paymentStatuses.length !== limit) {
      getPaymentStatuses();
    }

  }, [
    orderBy,
    descending,
    page,
    limit,
    dispatch,
    paymentStatus,
    selectedObj,
    updateSuccess,
    deleteSuccess,
    createSuccess,
  ]);

  const updatePaymentStatus = (id, paymentStatusData) => {
    const data = {
      name: paymentStatusData?.name,
      description: paymentStatusData?.description,
    };

    dispatch(
      updatePaymentStatusRequestStart({
        id,
        data: JSON.stringify(data),
      })
    );
  };

  const handleUpdate = (value) => {
    setSelectedObj(value);
    setShowUpdate(true);
  };

  const createPaymentStatus = ({ name, description, }) => {
    const data = {
      name,
      description,
    };

    dispatch(createPaymentStatusRequestStart(JSON.stringify(data)));

    setShowCreate(false);
  };

  const confirmUpdatePaymentStatus = (id, paymentStatusData) => {
    setConfirmAction(() => () => {
      updatePaymentStatus(id, paymentStatusData);
      setShowConfirm(false);
      setShowUpdate(false);
    });
    setConfirmMessage('Are you sure you want to save these changes?');
    setShowConfirm(true);
  };

  const handleDelete = (value) => {
    setConfirmAction(() => () => {
      dispatch(deletePaymentStatusRequestStart(value?._id));
      setSelectedObj(null);
      setShowConfirm(false);
    });
    setConfirmMessage('Are you sure you want to delete this item?');
    setShowConfirm(true);
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
      <CreatePaymentStatusModal
        setShow={setShowCreate}
        show={showCreate}
        createPaymentStatus={createPaymentStatus}
      />
      <UpdatePaymentStatusModal
        setShow={setShowUpdate}
        show={showUpdate}
        updatePaymentStatus={confirmUpdatePaymentStatus}
        paymentStatus={selectedObj}
      />
      <div className='flex flex-col'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>
          {translate('payment-status')}
        </div>
        <div className='flex flex-row w-full justify-between gap-3'>
          <div className='rounded-xl p-3 bg-white w-full'>
            <div className='text-right mb-3'>
              <Button onClick={() => setShowCreate(true)} variant='contained'>
                {translate('create')}
              </Button>
            </div>
            <DataTable
              actions={[
                {
                  label: translate('update'),
                  handler: handleUpdate,
                },
                {
                  label: translate('delete'),
                  handler: handleDelete,
                },
              ]}
              columns={[
                {
                  field: '_id',
                  enableSort: false,
                  label: translate('#'),
                },
                {
                  field: 'name',
                  enableSort: true,
                  label: translate('name'),
                },
                {
                  field: 'description',
                  enableSort: false,
                  label: translate('description'),
                },
              ]}
              data={paymentStatuses?.map((item) => ({
                ...item,
              }))}
              keyField='_id'
              onSort={(f, des) => {
                setOrderBy(f);
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

export default PaymentStatusPage;
