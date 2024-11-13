import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { getAuthorsRequestStart, } from '~/redux/author/slice';
import { clientRoutes, } from '~/configs/routes';
import { CustomerPagination, } from '~/components';

const CustomerAuthorPage = () => {
  const { authors, author, meta, } = useSelector((state) => state.author);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderBy,] = React.useState('');
  const [descending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit,] = React.useState(20);
  React.useEffect(() => {
    dispatch(
      getAuthorsRequestStart({
        orderBy,
        page,
        limit,
        descending,
      })
    );
  }, [dispatch, author, page,]);

  const handleClick = (author) => {
    navigate(clientRoutes.authorDetail.replace(':id', author._id));
  };
  return (
    <>
      {authors && (
        <>
          <div className='py-4 px-4 rounded-lg shadow-sm bg-white'>
            <h2 className='text-lg text-left font-bold pb-2 mb-4 border-b'>
              Tác giả
            </h2>
            <div className='grid grid-cols-5 flex-wrap gap-3 justify-between'>
              {authors?.map((author) => (
                <div
                  key={author._id}
                  className='flex flex-col items-center text-center p-4 px-6'
                  onClick={() => handleClick(author)}
                >
                  {author.avatar ? (
                    <img
                      src={`${process.env.REACT_APP_HOST_IP}/${author.avatar}`}
                      alt={author.fullname}
                      className='size-36 rounded-full object-cover'
                    />
                  ) : (
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/pages/other/unAuthorImage.webp`}
                      className='size-36 rounded-full object-cover'
                    />
                  )}

                  <span className='text-sm font-medium mt-1'>
                    {author.fullname}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <CustomerPagination
            currentPage={meta?.page ?? 1}
            totalPages={meta?.totalPage ?? 1}
            onPageChange={setPage}
          />
        </>
      )}
    </>
  );
};

export default CustomerAuthorPage;
