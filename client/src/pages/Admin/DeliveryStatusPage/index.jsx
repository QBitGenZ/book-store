import React, { useEffect, useState, } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { ConfirmationModal, DataTable, Pagination, } from '~/components';
import { translate, } from '~/helpers';
import { createDeliveryStatusRequestStart,
  deleteDeliveryStatusRequestStart,
  getDeliveryStatusesRequestStart,
  updateDeliveryStatusRequestStart, } from '~/redux/deliveryStatus/slice';
import CreateDeliveryStatusModal from './components/CreateDeliveryStatusModal';
import UpdateDeliveryStatusModal from './components/UpdateDeliveryStatusModal';
import { Button, } from '@mui/material';

const DeliveryStatusPage = () => {
  const dispatch = useDispatch();
  const {
    deliveryStatuses,
    meta,
    deliveryStatus,
    updateSuccess,
    deleteSuccess,
    createSuccess,
  } = useSelector((state) => state.deliveryStatus);

  const [orderBy, setOrderBy,] = useState('');
  const [descending, setDescending,] = useState(true);
  const [page, setPage,] = useState(1);
  const [limit, setLimit,] = useState(5);
  const [selectedObj, setSelectedObj,] = useState(null);

  const [showCreate, setShowCreate,] = useState(false);
  const [showUpdate, setShowUpdate,] = useState(false);
  const [showConfirm, setShowConfirm,] = useState(false);
  const [confirmAction, setConfirmAction,] = useState(() => () => {
  });
  const [confirmMessage, setConfirmMessage,] = useState('');

  const getDeliveryStatuses = () => {
    dispatch(
      getDeliveryStatusesRequestStart({
        orderBy,
        page,
        limit,
        descending,
      })
    );
  };

  useEffect(() => {
    if (!deliveryStatuses || deliveryStatuses.length === 0 || deliveryStatuses.length !== limit) {
      getDeliveryStatuses();
    }
  }, [
    orderBy,
    descending,
    page,
    limit,
    dispatch,
    deliveryStatus,
    selectedObj,
    updateSuccess,
    deleteSuccess,
    createSuccess,
  ]);

  const getNextStatus = (deliveryStatuses, currentDeliveryStatus) => {
    const nextStatus = deliveryStatuses.find(
      (status) => status._id === currentDeliveryStatus.nextStatus
    );
    return nextStatus ? nextStatus.name : '';
  };

  const updateDeliveryStatus = (id, deliveryStatusData) => {
    const data = {
      name: deliveryStatusData?.name,
      description: deliveryStatusData?.description,
      nextStatus: deliveryStatusData?.nextStatus,
    };

    dispatch(
      updateDeliveryStatusRequestStart({
        id,
        data: JSON.stringify(data),
      })
    );
  };

  const handleUpdate = (value) => {
    setSelectedObj(value);
    setShowUpdate(true);
  };

  const createDeliveryStatus = ({ name, description, nextStatus, }) => {
    const data = {
      name,
      description,
      nextStatus,
    };

    dispatch(createDeliveryStatusRequestStart(JSON.stringify(data)));
    setShowCreate(false);
  };

  const confirmUpdateDeliveryStatus = (id, deliveryStatusData) => {
    setConfirmAction(() => () => {
      updateDeliveryStatus(id, deliveryStatusData);
      setShowConfirm(false);
      setShowUpdate(false);
    });
    setConfirmMessage('Are you sure you want to save these changes?');
    setShowConfirm(true);
  };

  const handleDelete = (value) => {
    setConfirmAction(() => () => {
      dispatch(deleteDeliveryStatusRequestStart(value?._id));
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
      <CreateDeliveryStatusModal
        setShow={setShowCreate}
        show={showCreate}
        createDeliveryStatus={createDeliveryStatus}
        statusOptions={deliveryStatuses.map((status) => status)}
      />
      <UpdateDeliveryStatusModal
        setShow={setShowUpdate}
        show={showUpdate}
        updateDeliveryStatus={confirmUpdateDeliveryStatus}
        deliveryStatus={selectedObj}
        statusOptions={deliveryStatuses.map((status) => status)}
      />
      <div className='flex flex-col'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>
          {translate('delivery-status')}
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
                {
                  field: 'nextStatus',
                  enableSort: false,
                  label: translate('next-status'),
                },
                {
                  field: 'displayNextStatus',
                  enableSort: false,
                  label: translate('display-next-status'),
                },
              ]}
              data={deliveryStatuses?.map((item) => ({
                ...item,
                displayNextStatus: getNextStatus(deliveryStatuses, item),
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

export default DeliveryStatusPage;
