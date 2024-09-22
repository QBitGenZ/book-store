import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { ConfirmationModal, DataTable, Pagination, } from '~/components';
import { translate, } from '~/helpers';
import { createAuthorByAdminRequestStart,
  deleteAuthorByAdminRequestStart,
  getAuthorsByAdminRequestStart,
  updateAuthorByAdminRequestStart, } from '~/redux/author/slice';
import CreateAuthorModal from './components/CreateAuthorModal';
import UpdateAuthorModal from './components/UpdateAuthorModal';
import { Button, } from '@mui/material';

const AuthorPage = () => {
  const dispatch = useDispatch();
  const { authors, meta, author, updateSuccess, deleteSuccess, createSuccess, } =
    useSelector((state) => state.author);

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

  const getAuthors = () => {
    dispatch(
      getAuthorsByAdminRequestStart({
        orderBy,
        page,
        limit,
        descending,
      })
    );
  };

  const formatDate = (dateString) => {
    // let date;
    // date = new Date(dateString);
    // return date.toLocaleDateString('vn-VN');
    let date;
    date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  React.useEffect(() => {
    getAuthors();
  }, [
    orderBy,
    descending,
    page,
    limit,
    dispatch,
    author,
    selectedObj,
    updateSuccess,
    deleteSuccess,
    createSuccess,
  ]);

  const updateAuthor = (id, author) => {
    const formData = new FormData();
    formData.append('fullname', author?.fullname);
    if (author?.birthday) formData.append('birthday', author?.birthday);
    if (author?.nationality)
      formData.append('nationality', author?.nationality);
    if (author?.biography) formData.append('biography', author?.biography);
    if (author?.avatar) formData.append('avatar', author?.avatar?.file);

    dispatch(
      updateAuthorByAdminRequestStart({
        id,
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

  const createAuthor = ({
    fullname,
    birthday,
    nationality,
    biography,
    avatar,
  }) => {
    const formData = new FormData();
    formData.append('fullname', fullname);
    if (birthday) formData.append('birthday', birthday);
    if (nationality) formData.append('nationality', nationality);
    if (biography) formData.append('biography', biography);
    if (avatar) formData.append('avatar', avatar.file);

    dispatch(createAuthorByAdminRequestStart(formData));

    setShowCreate(false);
  };

  const confirmUpdateAuthor = (id, author) => {
    setConfirmAction(() => () => {
      updateAuthor(id, author);
      setShowConfirm(false);
      setShowUpdate(false);
    });
    setConfirmMessage('Bạn có chắc chắn muốn lưu thay đổi này không?');
    setShowConfirm(true);
  };

  const handleDelete = (value) => {
    setConfirmAction(() => () => {
      dispatch(deleteAuthorByAdminRequestStart(value?._id));
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
      <CreateAuthorModal
        setShow={setShowCreate}
        show={showCreate}
        createAuthor={createAuthor}
      />
      <UpdateAuthorModal
        setShow={setShowUpdate}
        show={showUpdate}
        updateAuthor={confirmUpdateAuthor}
        author={selectedObj}
      />
      <div className='flex flex-col'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>
          {translate('author')}
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
                  field: 'fullname',
                  enableSort: true,
                  label: translate('fullname'),
                },
                {
                  field: 'avatar',
                  enableSort: false,
                  label: translate('avatar'),
                },
                {
                  field: 'nationality',
                  enableSort: false,
                  label: translate('nationality'),
                },
                {
                  field: 'birthday',
                  enableSort: true,
                  label: translate('birthday'),
                },
                {
                  field: 'biography',
                  enableSort: false,
                  label: translate('biography'),
                },
              ]}
              data={authors?.map((item) => ({
                ...item,
                avatar: item?.avatar ? (
                  <img
                    className='h-20 inline-block'
                    src={`${process.env.REACT_APP_HOST_IP}/${item?.avatar}`}
                    alt={item?.fullname}
                  />
                ) : (
                  ''
                ),
                birthday: item?.birthday ? formatDate(item?.birthday) : '',
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

export default AuthorPage;
