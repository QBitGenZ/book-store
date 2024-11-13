import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getProductRequestStart, } from '~/redux/product/slice';
import { useParams, } from 'react-router-dom';
import ProductPurchaseSection from '~/pages/Customer/ProductInfoPage/Components/ProductPurchaseSection';
import { ProductDetailInformation, ProductImage, } from '~/components';
import ProductNameCard from '~/pages/Customer/ProductInfoPage/Components/ProductNameCard';
import { createCartRequestStart, } from '~/redux/cart/slice';
import { getPublishersRequestStart, } from '~/redux/publisher/slice';
import { getTypesRequestStart, } from '~/redux/productType/slice';
import { getAuthorsRequestStart, } from '~/redux/author/slice';
import { getAllFormatsRequestStart, } from '~/redux/format/slice';

const ProductInfoPage = () => {
  const dispatch = useDispatch();

  const { id, } = useParams();
  const { product, } = useSelector((state) => state.product);
  const getProduct = () => {
    dispatch(getProductRequestStart(id));
  };

  const handleAddToCart = (product, quantity) => {
    const cartData = {
      product: product._id,
      quantity: quantity,
    };

    dispatch(createCartRequestStart(JSON.stringify(cartData))); // Dispatch the action with the JSON payload
  };

  React.useEffect(() => {
    getProduct();
    dispatch(
      getPublishersRequestStart({
        limit: 1000,
      })
    );
    dispatch(
      getTypesRequestStart({
        limit: 1000,
      })
    );
    dispatch(
      getAuthorsRequestStart({
        limit: 1000,
      })
    );
    dispatch(
      getAllFormatsRequestStart({
        limit: 1000,
      })
    );
  }, []);
  const render = () => (
    <>
      <div className={'relative flex flex-col gap-3 m-2'}>
        {/* <div className='flex justify-start' onClick={handleBack} style={{*/}
        {/*  color: shop?.accentColor,*/}
        {/* }}>*/}
        {/*  <FontAwesomeIcon icon={faArrowLeft}/>*/}
        {/* </div>*/}

        <div className='overflow-y-auto flex flex-row gap-3'>
          <div className={'flex flex-col gap-3 sticky top-0'}>
            <div className={'sticky top-0 flex flex-col gap-3'}>
              <ProductImage product={product} />
            </div>
            <div>
              <ProductPurchaseSection
                product={product}
                handleAddToCart={handleAddToCart}
              ></ProductPurchaseSection>
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
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );

  return render();
};

export default ProductInfoPage;
