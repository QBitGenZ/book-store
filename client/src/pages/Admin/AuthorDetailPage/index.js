import React from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import { getAuthorRequestStart, } from '~/redux/author/slice';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import { AuthorDetail, } from '~/components';

const AuthorDetailPage = () => {
  const { id, } = useParams();
  const { author, } = useSelector((state) => state.author);
  const { shop, } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAuthor = (id) => {
    dispatch(getAuthorRequestStart(id));
  };
  const handleBack = () => {
    navigate(-1);
  };
  React.useEffect(() => {
    getAuthor(id);
    console.log(author);
  }, []);

  return (
    <div className={'flex flex-col gap-3 h-max'}>
      <div
        className='left-0 justify-self-start  w-fit'
        onClick={handleBack}
        style={{
          color: shop?.accentColor,
        }}
      >
        <FontAwesomeIcon className='left-0 inset-y-0' icon={faArrowLeft} />
      </div>

      <div className={'h-full mx-12'}>
        <AuthorDetail author={author} />
      </div>
    </div>
  );
};

export default AuthorDetailPage;
