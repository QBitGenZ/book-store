import React from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import { getAuthorRequestStart, } from '~/redux/author/slice';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import { AuthorDetail, CustomerPagination, ProductList, } from '~/components';
import { getProductsByAuthorRequestStart, } from '~/redux/product/slice';

const AuthorDetailPage = () => {
  const { id, } = useParams();
  const { author, } = useSelector((state) => state.author);
  const { shop, } = useSelector((state) => state.config);
  const { products, meta, } = useSelector((state) => state.product);
  const [orderBy,] = React.useState('');
  const [descending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit,] = React.useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAuthor = (id) => {
    dispatch(getAuthorRequestStart(id));
  };
  const getProducts = (id) => {
    dispatch(
      getProductsByAuthorRequestStart({
        id,
        meta: {
          orderBy,
          page,
          limit,
          descending,
        },
      })
    );
  };
  const handleBack = () => {
    navigate(-1);
  };
  React.useEffect(() => {
    getAuthor(id);
    getProducts(id);
  }, [dispatch,]);

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
      {products.length > 0 && (
        <div>
          <ProductList products={products} title={'Tác phẩm'} />
          <CustomerPagination
            currentPage={meta?.page ?? 1}
            totalPages={meta?.totalPage ?? 1}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default AuthorDetailPage;
