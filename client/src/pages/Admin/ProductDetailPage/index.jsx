import React from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import { getProductRequestStart, } from '~/redux/product/slice';
import { getPublishersByAdminRequestStart, } from '~/redux/publisher/slice';
import { getTypesByAdminRequestStart, } from '~/redux/productType/slice';
import { getAuthorsByAdminRequestStart, } from '~/redux/author/slice';
import { adminRoutes, } from '~/configs/routes';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import ProductImage from '~/components/ProductImage/productImage';
import ProductInfo from '~/components/ProductInfo';

const ProductDetailPage = () => {
  const { shop, } = useSelector(state => state.config);
  const navigate = useNavigate();

  const { id, } = useParams();
  const { product, } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const getProduct = () => {
    dispatch(getProductRequestStart(
      id
    ));
  };

  const handleBack = () => {
    navigate(adminRoutes.product);
  };

  React.useEffect(() => {
    getProduct();
    dispatch(getPublishersByAdminRequestStart);
    dispatch(getTypesByAdminRequestStart);
    dispatch(getAuthorsByAdminRequestStart);
  }, []);

  const render = () => (
    <>

      <div className={'relative flex flex-col gap-4 m-2'}>
        <div className='flex justify-start' onClick={handleBack} style={{
          color: shop?.accentColor,
        }}>
          <FontAwesomeIcon icon={faArrowLeft}/>
        </div>

        <div className='flex flex-row gap-4'>

          <div>
            <ProductImage
              product={product}
            />
          </div>
          <div>
            <ProductInfo
              product={product}
            />
          </div>

        </div>
      </div>
    </>
  );

  return render();
};

export default ProductDetailPage;