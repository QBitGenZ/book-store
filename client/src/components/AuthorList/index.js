import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getAuthorsRequestStart, } from '~/redux/author/slice';
import { clientRoutes, } from '~/configs/routes';
import { useNavigate, } from 'react-router-dom';

function AuthorList() {
  const { authors, author, } = useSelector((state) => state.author);
  const { shop, } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderBy,] = React.useState('');
  const [descending,] = React.useState(true);
  const [page,] = React.useState(1);
  const [limit,] = React.useState(5);
  React.useEffect(() => {
    dispatch(
      getAuthorsRequestStart({
        orderBy,
        page,
        limit,
        descending,
      })
    );
  }, [dispatch, author,]);

  const handleClick = (author) => {
    navigate(clientRoutes.authorDetail.replace(':id', author._id));
  };
  const handleAll = () => {
    navigate(clientRoutes.author);
  };

  return (
    <>
      {authors && (
        <div className='p-4 rounded-lg shadow-sm bg-white'>
          <h2 className='text-lg text-left font-bold pb-2 mb-4 border-b'>
            Tác giả
          </h2>
          <div className='flex flex-row flex-wrap gap-3 justify-between'>
            {authors?.map((author) => (
              <div
                key={author._id}
                className='flex flex-col items-center text-center p-4'
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

          <div className={'mt-3'}>
            <button
              onClick={handleAll}
              className={`border-2 border-[${shop?.accentColor}] p-2 px-5 rounded text-sm font-semibold`}
            >
              Xem tất cả
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AuthorList;
