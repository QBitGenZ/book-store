import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getProductsRequestStart, } from '~/redux/product/slice';
import { getShopRequestStart, } from '~/redux/config/slice';
import { CustomerPagination, Filter, ProductList, } from '~/components';
import { translate, } from '~/helpers';

const BookPage = () => {
  const { products, meta, } = useSelector((state) => state.product);
  const [orderBy,] = React.useState('');
  const [descending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit,] = React.useState(20);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      getProductsRequestStart({
        orderBy,
        page,
        limit,
        descending,
      })
    );
    dispatch(getShopRequestStart());
  }, [dispatch, page, orderBy, descending, limit,]);
  return (
    <div className={'flex flex-row gap-3 w-full'}>
      <div className={'shrink-0'}>
        <Filter></Filter>
      </div>
      <div className={'w-full h-full'}>
        {products && products.length !== 0 && (
          <div>
            <ProductList products={products} />
            <CustomerPagination
              currentPage={meta?.page ?? 1}
              totalPages={meta?.totalPage ?? 1}
              onPageChange={setPage}
            />
          </div>
        )}
        {products && products.length === 0 && (
          <div>
            <div className={'rounded  w-full flex flex-col items-center p-16'}>
              {/* <img className='mb-4' src={`${process.env.PUBLIC_URL}/assets/pages/other/ico_emptycart.svg`}*/}
              {/*  alt='Empty Cart'/>*/}
              <p>{translate('Không tìm thấy sách phù hợp')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookPage;
