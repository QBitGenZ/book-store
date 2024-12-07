import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { ConfirmationModal, DataTable, Pagination, } from '~/components';
import { formatCurrency, translate, } from '~/helpers';
import { deleteProductRequestStart,
  getProductsRequestStart, } from '~/redux/product/slice';

import { Button, } from '@mui/material';
import { adminRoutes, } from '~/configs/routes';
import { getPublishersByAdminRequestStart, } from '~/redux/publisher/slice';
import { getAuthorsByAdminRequestStart, } from '~/redux/author/slice';
import { formatDate, } from 'src/helpers';

const ProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, meta, updateSuccess, deleteSuccess, createSuccess, } =
    useSelector((state) => state.product);
  const { authors, } = useSelector((state) => state.author);
  const { publishers, } = useSelector((state) => state.publisher);
  // const { users, } = useSelector(state => state.user);

  const [orderBy, setOrderBy,] = React.useState('');
  const [descending, setDescending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit, setLimit,] = React.useState(5);
  const [selectedObj, setSelectedObj,] = React.useState(null);

  const [showConfirm, setShowConfirm,] = React.useState(false);
  const [confirmAction, setConfirmAction,] = React.useState(() => () => {});
  const [confirmMessage, setConfirmMessage,] = React.useState('');

  const getProducts = () => {
    dispatch(
      getProductsRequestStart({
        orderBy,
        page,
        limit,
        descending,
        isEbook: false,
      })
    );
  };

  const getPublishers = () => {
    dispatch(
      getPublishersByAdminRequestStart({
        limit: 1000,
      })
    );
  };

  const getAuthors = () => {
    dispatch(
      getAuthorsByAdminRequestStart({
        limit: 1000,
      })
    );
  };

  // const getUsers = () => {
  //   dispatch(getUserAllRequestStart());
  // };

  React.useEffect(() => {
    getProducts();
    getAuthors();
    getPublishers();
    // getUsers();
  }, [
    orderBy,
    descending,
    page,
    limit,
    dispatch,
    selectedObj,
    updateSuccess,
    deleteSuccess,
    createSuccess,
  ]);

  const handleDelete = (value) => {
    setConfirmAction(() => () => {
      dispatch(deleteProductRequestStart(value?._id));
      setSelectedObj(null);
      setShowConfirm(false);
    });
    setConfirmMessage('Are you sure you want to delete this item?');
    setShowConfirm(true);
  };

  const handleCreate = () => {
    navigate(adminRoutes.createProduct);
  };

  const handleUpdate = (value) => {
    const selectedCopy = {
      ...value,
    };
    setSelectedObj(selectedCopy);
    navigate(adminRoutes.updateProduct.replace(':id', value._id));
  };

  const handleShowDetail = (value) => {
    navigate(adminRoutes.productDetail.replace(':id', value._id));
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

      <div className='flex flex-col'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>
          {translate('product')}
        </div>
        <div className='flex flex-row w-full justify-between gap-3'>
          <div className='rounded-xl p-3 bg-white w-full'>
            <div className='text-right mb-3'>
              <Button onClick={handleCreate} variant='contained'>
                {translate('create')}
              </Button>
            </div>
            <DataTable
              actions={[
                {
                  label: translate('show-detail'),
                  handler: handleShowDetail,
                },
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
                  field: 'image',
                  enableSort: false,
                  label: translate('image'),
                },
                {
                  field: 'author',
                  enableSort: false,
                  label: translate('author'),
                },
                {
                  field: 'publisher',
                  enableSort: false,
                  label: translate('publisher'),
                },
                // {
                //   field: 'donor',
                //   enableSort: false,
                //   label: translate('donor'),
                // },
                {
                  field: 'price',
                  enableSort: true,
                  label: translate('price'),
                },
                {
                  field: 'stockQuantity',
                  enableSort: true,
                  label: translate('stock'),
                },
                {
                  field: 'pubDate',
                  enableSort: true,
                  label: translate('pub-date'),
                },
              ]}
              data={products?.map((item) => ({
                ...item,
                image: item?.images[0] ? (
                  <img
                    className='h-20 w-24 inline-block object-contain'
                    src={`${process.env.REACT_APP_HOST_IP}/${item?.images[0]}`}
                    alt={item?.name}
                  />
                ) : (
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/pages/other/noImageItem.jpg`}
                    alt='Product'
                    className='h-20 w-24 inline-block object-contain'
                  />
                ),
                pubDate: formatDate(item?.pubDate),
                author: authors?.find((author) => item.author === author._id)
                  ?.fullname,
                publisher: publishers?.find(
                  (publisher) => item.publisher === publisher._id
                )?.name,
                price: formatCurrency(item?.price),
                // donor: users?.find((user) => item.donor === user._id)?.fullname,
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

export default ProductPage;
