import React from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import { getAuthorRequestStart, } from '~/redux/author/slice';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import { AuthorDetail, ProductList, } from '~/components';
import { getProductsByAuthorRequestStart, } from '~/redux/product/slice';

const CustomerAuthorDetailPage = () => {
  const { id, } = useParams();
  const { author, } = useSelector((state) => state.author);
  const { products, } = useSelector((state) => state.product);
  const { shop, } = useSelector(state => state.config);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAuthor = (id) => {
    dispatch(getAuthorRequestStart(id));
  };

  const getProducts = (id) => {
    dispatch(getProductsByAuthorRequestStart({
      id,
    }));
  };
  const handleBack = () => {
    navigate(-1);
  };
  React.useEffect(() => {
    getAuthor(id);
    getProducts(id);
    console.log(author);
  }, []);

  return (
    <>
      <div className={'flex flex-col gap-3 h-full'}>

        <div className='left-0 justify-self-start  w-fit' onClick={handleBack} style={{
          color: shop?.accentColor,
        }}>
          <FontAwesomeIcon className='left-0 inset-y-0' icon={faArrowLeft}/>
        </div>
        {author && (
          <div className={'h-fit px-4 py-2 bg-white rounded shadow-sm'}>
            <AuthorDetail author={author}/>
          </div>
        )}
        {products.length > 0 && (
          <div>
            <ProductList products={products}/>
          </div>
        )}

      </div>
    </>
  );
};

export default CustomerAuthorDetailPage;
