import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { ConfirmationModal, DataTable, Pagination, } from '~/components';
import { translate, } from '~/helpers';
import { createPaymentMethodRequestStart,
  deletePaymentMethodRequestStart,
  getPaymentMethodsRequestStart,
  updatePaymentMethodRequestStart, } from '~/redux/paymentMethod/slice';
import CreatePaymentMethodModal from './components/CreatePaymentMethodModal';
import UpdatePaymentMethodModal from './components/UpdatePaymentMethodModal';
import { Button, } from '@mui/material';

const PaymentMethodPage = () => {
  const dispatch = useDispatch();
  const {
    paymentMethods,
    meta,
    paymentMethod,
    updateSuccess,
    deleteSuccess,
    createSuccess,
  } = useSelector((state) => state.paymentMethod);

  const [orderBy, setOrderBy,] = React.useState('');
  const [descending, setDescending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit, setLimit,] = React.useState(5);
  const [selectedObj, setSelectedObj,] = React.useState(null);

  const [showCreate, setShowCreate,] = React.useState(false);
  const [showUpdate, setShowUpdate,] = React.useState(false);
  const [showConfirm, setShowConfirm,] = React.useState(false);
  const [confirmAction, setConfirmAction,] = React.useState(() => () => {});
  const [confirmMessage, setConfirmMessage,] = React.useState('');

  const getPaymentMethods = () => {
    dispatch(
      getPaymentMethodsRequestStart({
        orderBy,
        page,
        limit,
        descending,
      })
    );
  };

  React.useEffect(() => {
    if (
      !paymentMethods ||
      paymentMethods.length === 0 ||
      paymentMethods.length !== limit
    ) {
      getPaymentMethods();
    }
  }, [
    orderBy,
    descending,
    page,
    limit,
    dispatch,
    paymentMethod,
    selectedObj,
    updateSuccess,
    deleteSuccess,
    createSuccess,
  ]);

  const updatePaymentMethod = (id, paymentMethodData) => {
    const data = {
      name: paymentMethodData?.name,
      description: paymentMethodData?.description,
    };

    dispatch(
      updatePaymentMethodRequestStart({
        id,
        data: JSON.stringify(data),
      })
    );
  };

  const handleUpdate = (value) => {
    setSelectedObj(value);
    setShowUpdate(true);
  };

  const createPaymentMethod = ({ name, description, }) => {
    const data = {
      name,
      description,
    };

    dispatch(createPaymentMethodRequestStart(JSON.stringify(data)));

    setShowCreate(false);
  };

  const confirmUpdatePaymentMethod = (id, paymentMethodData) => {
    setConfirmAction(() => () => {
      updatePaymentMethod(id, paymentMethodData);
      setShowConfirm(false);
      setShowUpdate(false);
    });
    setConfirmMessage('Are you sure you want to save these changes?');
    setShowConfirm(true);
  };

  const handleDelete = (value) => {
    setConfirmAction(() => () => {
      dispatch(deletePaymentMethodRequestStart(value?._id));
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
      <CreatePaymentMethodModal
        setShow={setShowCreate}
        show={showCreate}
        createPaymentMethod={createPaymentMethod}
      />
      <UpdatePaymentMethodModal
        setShow={setShowUpdate}
        show={showUpdate}
        updatePaymentMethod={confirmUpdatePaymentMethod}
        paymentMethod={selectedObj}
      />
      <div className='flex flex-col'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>
          {translate('payment-method')}
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
              data={paymentMethods?.map((item) => ({
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

export default PaymentMethodPage;
