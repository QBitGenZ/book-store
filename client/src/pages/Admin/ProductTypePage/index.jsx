import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { ConfirmationModal, DataTable, Pagination, } from '~/components';
import { translate, } from '~/helpers';
import { createTypeByAdminRequestStart,
  deleteTypeByAdminRequestStart,
  getTypesByAdminRequestStart,
  updateTypeByAdminRequestStart, } from '~/redux/productType/slice';
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';
import { Button, } from '@mui/material';

const ProductTypePage = () => {
  const dispatch = useDispatch();
  const { types, meta, type, updateSucess, deleteSuccess, createSuccess, } =
    useSelector((state) => state.type);

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

  const getTypes = () => {
    dispatch(
      getTypesByAdminRequestStart({
        orderBy,
        page,
        limit,
        descending,
      })
    );
  };

  React.useEffect(() => {
    getTypes();
  }, [
    orderBy,
    descending,
    page,
    limit,
    dispatch,
    type,
    selectedObj,
    updateSucess,
    deleteSuccess,
    createSuccess,
  ]);

  const updateProductType = (id, productType) => {
    const formData = new FormData();
    formData.append('name', productType?.name);
    if (productType?.description)
      formData.append('description', productType?.description);
    if (productType?.image) formData.append('image', productType?.image?.file);

    dispatch(
      updateTypeByAdminRequestStart({
        id: id,
        data: formData,
      })
    );
  };

  const handleUpdate = (value) => {
    console.log('Value before updating:', value);
    const selectedCopy = {
      ...value,
    };
    setSelectedObj(selectedCopy);
    setShowUpdate(true);
  };

  const createProductTypes = ({ name, description, image, }) => {
    const formData = new FormData();
    formData.append('name', name);
    if (description) formData.append('description', description);
    if (image) formData.append('image', image.file);

    dispatch(createTypeByAdminRequestStart(formData));

    setShowCreate(false);
  };

  const confirmUpdateProductType = (id, productType) => {
    setConfirmAction(() => () => {
      updateProductType(id, productType);
      setShowConfirm(false);
      setShowUpdate(false);
    });
    setConfirmMessage('Bạn có chắc chắn muốn lưu thay đổi này không?');
    setShowConfirm(true);
  };

  const handleDelete = (value) => {
    setConfirmAction(() => () => {
      dispatch(deleteTypeByAdminRequestStart(value?.id));
      setSelectedObj(null);
      setShowConfirm(false);
    });
    setConfirmMessage('Bạn có chắc chắn muốn xóa mục này không?');
    setShowConfirm(true);
  };

  const render = () => (
    <>
      <ConfirmationModal
        body={confirmMessage}
        onConfirm={confirmAction}
        onHide={() => setShowConfirm(false)}
        title='Xác nhận'
        show={showConfirm}
      />
      <CreateModal
        setShow={setShowCreate}
        show={showCreate}
        createProductType={createProductTypes}
      />
      <UpdateModal
        setShow={setShowUpdate}
        show={showUpdate}
        updateProductType={confirmUpdateProductType}
        productType={selectedObj}
      />
      <div className='flex flex-col'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>
          {translate('product-type')}
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
                  field: 'id',
                  enableSort: false,
                  label: translate('#'),
                },
                {
                  field: 'name',
                  enableSort: true,
                  label: translate('name'),
                },
                {
                  field: 'displayImage',
                  enableSort: false,
                  label: translate('image'),
                },
                {
                  field: 'description',
                  enableSort: false,
                  label: translate('description'),
                },
              ]}
              data={types?.map((item) => ({
                ...item,
                id: item._id,
                displayImage: item?.image ? (
                  <img
                    className='h-20 inline-block object-cover'
                    src={`${process.env.REACT_APP_HOST_IP}/${item?.image}`}
                    alt={item?.name}
                  />
                ) : (
                  ''
                ),
              }))}
              keyField='_id'
              onSort={(f, des) => {
                setOrderBy(f);
                setDescending(des == 'desc');
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

export default ProductTypePage;
