import React from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import { getProductsRequestStart, } from '~/redux/product/slice';
import { CustomerPagination, ProductList, } from '~/components';
import { translate, } from '~/helpers';
import { clientRoutes, } from '~/configs/routes';

const SearchResultPage = () => {
  const { query, } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderBy,] = React.useState('');
  const [descending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit,] = React.useState(20);

  const { products, meta, } = useSelector((state) => state.product);

  const goToHome = () => {
    navigate(clientRoutes.home);
  };

  React.useEffect(() => {
    dispatch(
      getProductsRequestStart({
        search: query,
        orderBy,
        page,
        limit,
        descending,
      })
    );
    console.log(products, meta);
  }, [query, dispatch, page, orderBy, descending, limit,]);

  return (
    <>
      {products.length > 0 && (
        <div>
          <ProductList title={'Kết quả tìm kiếm'} products={products} />
          <CustomerPagination
            currentPage={meta?.page ?? 1}
            totalPages={meta?.totalPage ?? 1}
            onPageChange={setPage}
          />
        </div>
      )}
      {products?.length === 0 && (
        <div>
          <div
            className={
              'rounded shadow-sm bg-white w-full flex flex-col items-center p-16'
            }
          >
            {/* <img className='mb-4' src={`${process.env.PUBLIC_URL}/assets/pages/other/ico_emptycart.svg`}*/}
            {/*  alt='Empty Cart'/>*/}
            <p>{translate('Không tìm thấy sách phù hợp')}</p>
            <button
              className='w-fit py-2 px-4 rounded shadow-md bg-red-600 text-white font-semibold mt-4'
              onClick={goToHome}
            >
              {translate('Về Trang chủ')}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResultPage;
