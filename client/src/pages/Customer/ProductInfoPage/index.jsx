import React from 'react';
import ProductImage from '~/components/ProductImage/productImage';
import { useDispatch, useSelector, } from 'react-redux';
import { getPublishersByAdminRequestStart, } from '~/redux/publisher/slice';
import { getTypesByAdminRequestStart, } from '~/redux/productType/slice';
import { getAuthorsByAdminRequestStart, } from '~/redux/author/slice';
import { getProductRequestStart, } from '~/redux/product/slice';
import { useParams, } from 'react-router-dom';
import ProductPurchaseSection from '~/pages/Customer/ProductInfoPage/Components/ProductPurchaseSection';
import ProductDetailInformation from '~/components/ProductDetailInformation';

const ProductInfoPage = () => {
  // const { shop, } = useSelector(state => state.config);
  const dispatch = useDispatch();

  const { id, } = useParams();
  const { product, } = useSelector((state) => state.product);
  // const navigate = useNavigate();
  const getProduct = () => {
    dispatch(getProductRequestStart(
      id
    ));
  };

  // const handleBack = () => {
  //   navigate(-1);
  // };

  React.useEffect(() => {
    getProduct();
    dispatch(getPublishersByAdminRequestStart());
    dispatch(getTypesByAdminRequestStart());
    dispatch(getAuthorsByAdminRequestStart());
  }, []);
  const render = () => (
    <>

      <div className={'relative flex flex-col gap-4 m-2'}>
        {/* <div className='flex justify-start' onClick={handleBack} style={{*/}
        {/*  color: shop?.accentColor,*/}
        {/* }}>*/}
        {/*  <FontAwesomeIcon icon={faArrowLeft}/>*/}
        {/* </div>*/}

        <div className='overflow-y-auto flex flex-row gap-4'>

          <div className={'sticky top-0'}>
            <ProductImage
              product={product}
            />
          </div>
          <div className={'w-full'}>
            <ProductDetailInformation product={product}
              hiddenFields={['_id', '__v', 'images', 'description', 'donor', 'cost', 'price', 'stockQuantity', 'quantity',]}
            />
          </div>
          <div>
            <ProductPurchaseSection></ProductPurchaseSection>
          </div>

        </div>

      </div>
    </>
  );

  return render();
};

export default ProductInfoPage;