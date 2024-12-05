import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getProductsByTypeRequestStart,
  getProductsRequestStart, } from '~/redux/product/slice';
import { getShopRequestStart, } from '~/redux/config/slice';
import { CustomerPagination, Filter, ProductList, } from '~/components';
import { translate, } from '~/helpers';

const BookPage = () => {
  const { products, meta, } = useSelector((state) => state.product);
  const { shop, } = useSelector((state) => state.config);
  const [orderBy, setOrderBy,] = React.useState('');
  const [descending, setDescending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit,] = React.useState(20);
  const [minPrice, setMinPrice,] = React.useState(0);
  const [maxPrice, setMaxPrice,] = React.useState(0);
  const [selectedCategory, setSelectedCategory,] = React.useState('');
  const dispatch = useDispatch();

  const getProducts = () => {
    dispatch(
      getProductsRequestStart({
        orderBy,
        page,
        limit,
        descending,
        minPrice: minPrice || 0,
        maxPrice: maxPrice || 99999999,
      })
    );
  };

  const getProductsByTypes = (id) => {
    dispatch(
      getProductsByTypeRequestStart({
        id,
        meta: {
          orderBy,
          page,
          limit,
          descending,
          minPrice: minPrice || 0,
          maxPrice: maxPrice || 99999999,
        },
      })
    );
  };

  const filterByPrice = () => {
    if (selectedCategory) {
      getProductsByTypes(selectedCategory);
    } else {
      getProducts();
    }
  };

  React.useEffect(() => {
    if (!shop) dispatch(getShopRequestStart());
  });
  React.useEffect(() => {
    // dispatch(
    //   getProductsRequestStart({
    //     orderBy,
    //     page,
    //     limit,
    //     descending,
    //   })
    // );
    filterByPrice();
  }, [dispatch, page, orderBy, descending, limit, selectedCategory,]);
  React.useEffect(() => {
    setPage(1);
  }, [selectedCategory, orderBy, descending,]);
  return (
    <div className={'flex flex-row gap-3 w-full'}>
      <div className={'shrink-0 hidden md:block'}>
        <Filter
          page={page}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          descending={descending}
          setDescending={setDescending}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filterByPrice={filterByPrice}
        ></Filter>
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
