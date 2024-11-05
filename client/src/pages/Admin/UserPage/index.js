import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { ConfirmationModal, DataTable, Pagination, } from '~/components';
import { translate, } from '~/helpers';
import { deleteUserByAdminRequestStart, getUserAllRequestStart, } from '~/redux/user/slice';

const UserPage = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { users, meta, user, updateSuccess, deleteSuccess, createSuccess, } = useSelector(state => state.user);

  const [orderBy, setOrderBy,] = React.useState('');
  const [descending, setDescending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit, setLimit,] = React.useState(5);
  const [selectedObj, setSelectedObj,] = React.useState(null);

  // const [showCreate, setShowCreate,] = React.useState(false);
  // const [setShowUpdate,] = React.useState(false);
  const [showConfirm, setShowConfirm,] = React.useState(false);
  const [confirmAction, setConfirmAction,] = React.useState(() => () => {
  });
  const [confirmMessage, setConfirmMessage,] = React.useState('');

  const getUsers = () => {
    dispatch(getUserAllRequestStart({
      orderBy,
      page,
      limit,
      descending,
    }));
  };

  React.useEffect(() => {
    if (!users || users.length === 0 || users.length !== limit) {
      getUsers();
    }
  }, [orderBy, descending, page, limit, dispatch, user, selectedObj, updateSuccess, deleteSuccess, createSuccess,]);

  // const handleDetail = (value) => {
  //   console.log('detail', value);
  //   navigate(adminRoutes.authorDetail.replace(':id', value?._id));
  // };

  const handleDelete = (value) => {
    setConfirmAction(() => () => {
      dispatch(deleteUserByAdminRequestStart(value?._id));
      setSelectedObj(null);
      setShowConfirm(false);
    });
    setConfirmMessage('Are you sure you want to delete this user?');
    setShowConfirm(true);
  };

  return (
    <>
      <ConfirmationModal
        body={confirmMessage}
        onConfirm={confirmAction}
        onHide={() => setShowConfirm(false)}
        title='Confirm'
        show={showConfirm}
      />
      {/* <CreateModal*/}
      {/*    setShow={setShowCreate}*/}
      {/*    show={showCreate}*/}
      {/*    createUser={createUser}*/}
      {/* />*/}
      {/* <UpdateModal*/}
      {/*    setShow={setShowUpdate}*/}
      {/*    show={showUpdate}*/}
      {/*    updateUser={confirmUpdateUser}*/}
      {/*    userData={selectedObj}*/}
      {/* />*/}
      <div className='flex flex-col'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>
          {translate('user-management')}
        </div>
        <div className='flex flex-row w-full justify-between gap-3'>
          <div className='rounded-xl p-3 bg-white w-full'>
            <DataTable
              actions={[
                // {
                //   label: translate('detail'),
                //   handler: handleDetail,
                // },
                {
                  label: translate('delete'),
                  handler: handleDelete,
                },
              ]}
              columns={[
                // {
                //   field: 'id',
                //   enableSort: false,
                //   label: translate('#'),
                // },
                {
                  field: 'displayAvatar',
                  enableSort: false,
                  label: translate('avatar'),
                },
                // {
                //   field: 'username',
                //   enableSort: true,
                //   label: translate('username'),
                // },
                {
                  field: 'fullname',
                  enableSort: true,
                  label: translate('fullname'),
                },
                {
                  field: 'email',
                  enableSort: true,
                  label: translate('email'),
                },

                {
                  field: 'phone',
                  enableSort: false,
                  label: translate('phone'),
                },
                {
                  field: 'formattedBirthday',
                  enableSort: true,
                  label: translate('birthday'),
                },
                {
                  field: 'isAdmin',
                  enableSort: true,
                  label: translate('admin'),
                },
              ]}
              data={users?.map(item => ({
                ...item,
                // id: item._id,
                displayAvatar: item?.avatar ? (
                  <img
                    className='size-20 inline-block rounded-full object-cover'
                    src={`${process.env.REACT_APP_HOST_IP}/${item?.avatar}`}
                    alt={item?.username}
                  />
                ) : '',
                formattedBirthday: item?.birthday ? new Date(item.birthday).toLocaleDateString() : '',
                isAdmin: item?.isAdmin ? 'Yes' : 'No',
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
};

export default UserPage;