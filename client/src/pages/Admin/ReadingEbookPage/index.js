import React from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';

import { getProductRequestStart, } from '~/redux/product/slice';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';

const ReadingEbookPage = () => {
  const { id, } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, } = useSelector((state) => state.product);
  const { shop, } = useSelector((state) => state.config);
  const getEbook = (id) => {
    dispatch(getProductRequestStart(id));
  };
  const handleBack = () => {
    navigate(-1);
  };
  React.useEffect(() => {
    getEbook(id);
  }, [dispatch,]);

  return (
    <div className={'flex flex-col gap-3 h-full'}>
      <div className={'relative mb-2'}>
        <div
          className='absolute inset-y-0 left-0 place-content-center'
          onClick={handleBack}
          style={{
            color: shop?.accentColor,
          }}
        >
          <FontAwesomeIcon className='left-0 inset-y-0' icon={faArrowLeft} />
        </div>
      </div>
      {product && (
        <iframe
          src={`${process.env.REACT_APP_HOST_IP}/${product.file}`}
          // src={data}
          loading={'lazy'}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            border: 'none',
          }}
        ></iframe>
      )}
    </div>
  );
};

export default ReadingEbookPage;
