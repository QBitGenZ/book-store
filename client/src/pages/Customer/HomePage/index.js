import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getProductsRequestStart, } from '~/redux/product/slice';
import { getShopRequestStart, } from '~/redux/config/slice';
import { CustomerPagination, ProductList, } from '~/components';
import Categories from './Components/Categories';

const HomePage = () => {
  const { products, meta, } = useSelector((state) => state.product);
  const [orderBy,] = React.useState('');
  const [descending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit,] = React.useState(20);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getProductsRequestStart({
      orderBy,
      page,
      limit,
      descending,
    }));
    dispatch(getShopRequestStart());
  }, [dispatch, page, orderBy, descending, limit,]);

  return (
    <>
      <div className={'w-full mb-4'}><Categories></Categories></div>
      <div>
        {products && <ProductList products={products} title={'Danh sách sản phẩm'}/>}
      </div>
      <CustomerPagination
        currentPage={meta?.page ?? 1}
        totalPages={meta?.totalPage ?? 1}
        onPageChange={setPage}
      />
    </>
  );
};

export default HomePage;
