import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getShopRequestStart, } from '~/redux/config/slice';
import { AuthorList, CustomCarousel, ProductList, } from '~/components';
import Categories from '~/pages/Customer/HomePage/Components/Categories';
import { getProductsRequestStart, } from '~/redux/product/slice';

const HomePage = () => {
  const { products, } = useSelector((state) => state.product);
  const [orderBy,] = React.useState('');
  const [descending,] = React.useState(true);
  const [page,] = React.useState(1);
  const [limit,] = React.useState(5);
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
  }, [dispatch, page, orderBy, descending, limit,]);
  React.useEffect(() => {
    dispatch(getShopRequestStart());
  });

  return (
    <>
      <div className={'flex flex-col gap-3'}>
        <div className={'w-full rounded'}>
          <CustomCarousel/>
        </div>
        <div className={'w-full'}>
          <AuthorList/>
        </div>

        <div>
          {products && (
            <div>
              <ProductList products={products} title={'Sách mới'}/>
              {/* <CustomerPagination*/}
              {/*  currentPage={meta?.page ?? 1}*/}
              {/*  totalPages={meta?.totalPage ?? 1}*/}
              {/*  onPageChange={setPage}*/}
              {/* />*/}
            </div>
          )}
        </div>
        <div className={'w-full'}>
          <Categories/>
        </div>

      </div>
    </>
  );
};

export default HomePage;
