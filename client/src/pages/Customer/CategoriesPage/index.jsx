import React from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import { CustomerPagination, ProductList, } from '~/components';
import { getProductsByTypeRequestStart, } from '~/redux/product/slice';
import { translate, } from '~/helpers';
import { clientRoutes, } from '~/configs/routes';

const CategoriesPage = () => {
  const { id, } = useParams();
  const dispatch = useDispatch();
  const { products, meta, } = useSelector(state => state.product);
  const [orderBy,] = React.useState('');
  const [descending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit,] = React.useState(20);
  const navigate = useNavigate();

  const goToHome = () => {
    navigate(clientRoutes.home);
  };

  React.useEffect(() => {
    if (id) {
      dispatch(
        getProductsByTypeRequestStart({
          id,
          meta: {
            orderBy,
            page,
            limit,
            descending,
          },
        })
      );
    }
  }, [id, dispatch, page, limit, descending,]);

  return (
    <>
      <div>{products?.length > 0 && <div>
        <ProductList products={products}/>
        <CustomerPagination
          currentPage={meta?.page ?? 1}
          totalPages={meta?.totalPage ?? 1}
          onPageChange={setPage}
        />
      </div>}</div>
      <div>
        {products?.length === 0 && <div>
          <div className={'rounded shadow-sm bg-white w-full flex flex-col items-center p-16'}>
            {/* <img className='mb-4' src={`${process.env.PUBLIC_URL}/assets/pages/other/ico_emptycart.svg`}*/}
            {/*  alt='Empty Cart'/>*/}
            <p>{translate('There are no products.')}</p>
            <button
              className='w-fit py-2 px-4 rounded shadow-md bg-red-600 text-white font-semibold mt-4'
              onClick={goToHome}>
              {translate('Go to Home')}
            </button>
          </div>
        </div>}
      </div>
    </>
  );
};

export default CategoriesPage;
