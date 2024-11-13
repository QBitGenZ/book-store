import React from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import { getProductRequestStart, } from '~/redux/product/slice';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import { ProductDetailInformation, ProductImage, } from '~/components';

const ProductDetailPage = () => {
  const { shop, } = useSelector((state) => state.config);
  const navigate = useNavigate();

  const { id, } = useParams();
  const { product, } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const getProduct = () => {
    dispatch(getProductRequestStart(id));
  };

  const handleBack = () => {
    navigate(-1);
  };

  React.useEffect(() => {
    getProduct();
    // dispatch(getPublishersByAdminRequestStart({
    //   limit: 1000,
    // }));
    // dispatch(getTypesByAdminRequestStart({
    //   limit: 1000,
    // }));
    // dispatch(getAuthorsByAdminRequestStart({
    //   limit: 1000,
    // }));
    // dispatch(getAllFormatsRequestStart({
    //   limit: 1000,
    // }));
  }, []);

  const render = () => (
    <>
      <div className={'relative flex flex-col gap-3 m-2'}>
        <div
          className='flex justify-start'
          onClick={handleBack}
          style={{
            color: shop?.accentColor,
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>

        <div className='flex flex-row gap-3'>
          <div className={'max-h-max'}>
            <ProductImage product={product} />
          </div>
          <div className={'w-full'}>
            <ProductDetailInformation
              product={product}
              hiddenFields={['__v', 'images', 'description',]}
            />
          </div>
        </div>
      </div>
    </>
  );

  return render();
};

export default ProductDetailPage;
