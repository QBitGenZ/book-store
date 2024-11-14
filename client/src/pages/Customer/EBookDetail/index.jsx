import React from 'react';
import { useParams, } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';

import { getProductRequestStart, } from '~/redux/product/slice';
import ProductNameCard from './Components/ProductNameCard';
import { ProductDetailInformation, ProductImage, } from '~/components';

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
      <div className='overflow-y-auto flex flex-row gap-3'>
        <div className={'flex flex-col gap-3 sticky top-0'}>
          <div className={'sticky top-0 flex flex-col gap-3'}>
            <ProductImage product={product} />
          </div>
        </div>
        <div className={'flex flex-col gap-3 w-full'}>
          <ProductNameCard product={product}></ProductNameCard>
          <ProductDetailInformation
            product={product}
            hiddenFields={[
              '_id',
              '__v',
              'images',
              'description',
              'donor',
              'cost',
              'price',
              'stockQuantity',
              'quantity',
              'name',
              'isShow',
              'file',
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default ReadEbookPage;
