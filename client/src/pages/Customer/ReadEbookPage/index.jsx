import React from 'react';
import { useParams, } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';

import { getProductRequestStart, } from '~/redux/product/slice';

const ReadEbookPage = () => {
  const { id, } = useParams();
  const dispatch = useDispatch();
  const { product, } = useSelector((state) => state.product);
  const getEbook = (id) => {
    dispatch(getProductRequestStart(id));
  };

  React.useEffect(() => {
    getEbook(id);
  }, [dispatch,]);

  return (
    <>
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
    </>
  );
};

export default ReadEbookPage;
