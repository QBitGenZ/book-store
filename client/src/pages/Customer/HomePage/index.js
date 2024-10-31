import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getProductsRequestStart, } from '~/redux/product/slice';
import { getShopRequestStart, } from '~/redux/config/slice';
import { AuthorList, CustomCarousel, CustomerPagination, ProductList, } from '~/components';
import Categories from '~/pages/Customer/HomePage/Components/Categories';

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
      <div>
        <div className={'w-full mb-4 rounded'}>
          <CustomCarousel/>
        </div>
        <div className={'w-full mb-4'}>
          <AuthorList/>
        </div>
        <div className={'w-full mb-4'}>
          <Categories/>
        </div>
        <div>
          {products &&
                        <div>
                          <ProductList products={products} title={'Danh sách sản phẩm'}/>
                          <CustomerPagination
                            currentPage={meta?.page ?? 1}
                            totalPages={meta?.totalPage ?? 1}
                            onPageChange={setPage}
                          />
                        </div>
          }
        </div>
      </div>

    </>
  );
};

export default HomePage;
