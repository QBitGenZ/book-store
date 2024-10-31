import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getAuthorsRequestStart, } from '~/redux/author/slice';

function AuthorList() {
  const { authors, author, } = useSelector(state => state.author);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [orderBy,] = React.useState('');
  const [descending,] = React.useState(true);
  const [page,] = React.useState(1);
  const [limit,] = React.useState(6);
  React.useEffect(() => {
    dispatch(getAuthorsRequestStart({
      orderBy,
      page,
      limit,
      descending,
    }));
  }, [dispatch, author,]);

  // const handleClick = (category) => {
  //   navigate(clientRoutes.categories.replace(':id', category._id));
  // };

  return (

    <div className='p-4 rounded-lg shadow-sm bg-white'>
      <h2 className='text-lg text-left font-bold pb-2 mb-4 border-b'>Tác giả</h2>
      <div className='flex flex-row flex-wrap gap-3 justify-between'>
        {authors?.map((author, index) => (
          <div key={index}
            className='flex flex-col items-center text-center p-4'
            // onClick={() => handleClick(author)}
          >
            {author.avatar ? (
              <img src={`${process.env.REACT_APP_HOST_IP}/${author.avatar}`} alt={author.name}
                className='size-36 rounded-full object-cover'/>
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/assets/pages/other/unAuthorImage.webp`}
                className='size-36 rounded-full object-cover'/>
            )}

            <span className='text-sm font-medium mt-1'>{author.fullname}</span>
          </div>
        ))}
      </div>
    </div>

  );

}

export default AuthorList;