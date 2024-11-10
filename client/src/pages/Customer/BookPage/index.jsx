import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getProductsRequestStart, } from '~/redux/product/slice';
import { getShopRequestStart, } from '~/redux/config/slice';
import { CustomerPagination, Filter, ProductList, } from '~/components';

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
    <div className={'flex flex-row gap-3'}>
      <div className={'shrink-0'}>
        <Filter></Filter>
      </div>
      <div>
        {products && (
          <div>
            <ProductList products={products} />
            <CustomerPagination
              currentPage={meta?.page ?? 1}
              totalPages={meta?.totalPage ?? 1}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookPage;
