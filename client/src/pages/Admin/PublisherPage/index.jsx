import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { ConfirmationModal, DataTable, Pagination, } from '~/components';
import { translate, } from '~/helpers';
import { createPublisherByAdminRequestStart,
  deletePublisherByAdminRequestStart,
  getPublishersByAdminRequestStart,
  updatePublisherByAdminRequestStart, } from '~/redux/publisher/slice';
import CreatePublisherModal from './components/CreatePublisherModal';
import UpdatePublisherModal from './components/UpdatePublisherModal';
import { Button, } from '@mui/material';
import { formatDate, } from 'src/helpers';

const PublisherPage = () => {
  const dispatch = useDispatch();
  const {
    publishers,
    meta,
    publisher,
    updateSuccess,
    deleteSuccess,
    createSuccess,
  } = useSelector((state) => state.publisher);

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

  const getPublishers = () => {
    dispatch(
      getPublishersByAdminRequestStart({
        orderBy,
        page,
        limit,
        descending,
      })
    );
  };

  React.useEffect(() => {
    getPublishers();
  }, [
    orderBy,
    descending,
    page,
    limit,
    dispatch,
    publisher,
    selectedObj,
    updateSuccess,
    deleteSuccess,
    createSuccess,
  ]);

  const updatePublisher = (id, publisherData) => {
    const formData = new FormData();
    formData.append('name', publisherData?.name);
    formData.append('address', publisherData?.address);
    formData.append('website', publisherData?.website);
    formData.append('email', publisherData?.email);
    formData.append('phone', publisherData?.phone);
    formData.append('establishedDate', publisherData?.establishedDate);
    if (publisherData?.logo) {
      formData.append('logo', publisherData?.logo?.file);
    }

    dispatch(
      updatePublisherByAdminRequestStart({
        id,
        data: formData,
      })
    );
  };

  const handleUpdate = (value) => {
    const selectedCopy = {
      ...value,
    };
    setSelectedObj(selectedCopy);
    setShowUpdate(true);
  };

  const createPublisher = ({
    name,
    address,
    website,
    email,
    phone,
    establishedDate,
    logo,
  }) => {
    const formData = new FormData();
    formData.append('name', name);
    if (address) formData.append('address', address);
    if (website) formData.append('website', website);
    if (email) formData.append('email', email);
    if (phone) formData.append('phone', phone);
    if (establishedDate) formData.append('establishedDate', establishedDate);
    if (logo) {
      formData.append('logo', logo.file);
    }

    dispatch(createPublisherByAdminRequestStart(formData));

    setShowCreate(false);
  };

  const confirmUpdatePublisher = (id, publisherData) => {
    setConfirmAction(() => () => {
      updatePublisher(id, publisherData);
      setShowConfirm(false);
      setShowUpdate(false);
    });
    setConfirmMessage('Are you sure you want to save these changes?');
    setShowConfirm(true);
  };

  const handleDelete = (value) => {
    setConfirmAction(() => () => {
      dispatch(deletePublisherByAdminRequestStart(value?._id));
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
      <CreatePublisherModal
        setShow={setShowCreate}
        show={showCreate}
        createPublisher={createPublisher}
      />
      <UpdatePublisherModal
        setShow={setShowUpdate}
        show={showUpdate}
        updatePublisher={confirmUpdatePublisher}
        publisher={selectedObj}
      />
      <div className='flex flex-col'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>
          {translate('publisher')}
        </div>
        <div className='flex flex-row w-full justify-between gap-3'>
          <div className='rounded-xl p-3 bg-white w-fit'>
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
                  field: 'logo',
                  enableSort: false,
                  label: translate('logo'),
                },
                {
                  field: 'address',
                  enableSort: false,
                  label: translate('address'),
                },
                {
                  field: 'website',
                  enableSort: false,
                  label: translate('website'),
                },
                {
                  field: 'email',
                  enableSort: false,
                  label: translate('email'),
                },
                {
                  field: 'phone',
                  enableSort: false,
                  label: translate('phone'),
                },
                {
                  field: 'establishedDate',
                  enableSort: false,
                  label: translate('established-date'),
                },
              ]}
              data={publishers?.map((item) => ({
                ...item,
                logo: item?.logo ? (
                  <img
                    className='h-20 inline-block object-cover'
                    src={`${process.env.REACT_APP_HOST_IP}/${item?.logo}`}
                    alt={item?.name}
                  />
                ) : (
                  ''
                ),
                establishedDate: formatDate(item?.establishedDate),
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

export default PublisherPage;
