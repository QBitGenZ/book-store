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

const ProductDetailPage = () => {
  const { shop, } = useSelector(state => state.config);
  const navigate = useNavigate();
  
  const { id, } = useParams();
  const { product, } = useSelector((state) => state.product);
  // const { publishers, } = useSelector((state) => state.publisher);
  // const { types, } = useSelector(state => state.type);
  // const { authors, } = useSelector(state => state.author);

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
    console.log(product.images.length);
  }, []);

  const render = () => (
    <>
      <div className='grid grid-cols-3 gap-3'>
        <div className={'relative'}>
          <div className='absolute inset-y-0 left-0 place-content-center' onClick={handleBack} style={{
            color: shop?.accentColor,
          }}>
            <FontAwesomeIcon className='left-0 inset-y-0' icon={faArrowLeft}/>
          </div>
        </div>
        <div>

        </div>
        <div></div>
      </div>
      <div className='max-w-6xl mx-auto p-6 grid grid-cols-2 gap-6'>
        <div className='space-y-4'>
          <div className='bg-white border rounded-lg p-4'>
            <img
              src={`${process.env.REACT_APP_HOST_IP}/${product?.images[0]}`}
              alt='Product'
              className='w-full h-auto'
            />
          </div>
          <div className='flex space-x-4'>
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={`${process.env.REACT_APP_HOST_IP}/${image}`}
                alt={`Thumbnail ${index + 1}`}
                className='w-24 h-32'
              />
            ))}
          </div>

        </div>

        <div className='space-y-6'>
          <div>
            <h1 className='text-2xl font-bold'>
              {product.name}
            </h1>
            {product.publisher && (
              <p className='text-gray-600'>
                                Nhà xuất bản: {product.publisher}
              </p>
            )}
          </div>
        </div>

      </div>
    </>
  );

  return render();
};

export default ProductDetailPage;