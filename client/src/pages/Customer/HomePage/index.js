import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getProductsRequestStart, } from '~/redux/product/slice';
import { getShopRequestStart, } from '~/redux/config/slice';
import { ProductList, } from '~/components';

const HomePage = () => {
  const { products, } = useSelector((state) => state.product);
  const [orderBy,] = React.useState('');
  const [descending,] = React.useState(true);
  const [page,] = React.useState(1);
  const [limit,] = React.useState(100);
  // const { shop, } = useSelector((state) => state.config);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getProductsRequestStart({
      orderBy,
      page,
      limit,
      descending,
    }));
    dispatch(getShopRequestStart());
  }, [dispatch,]);

  return (
    <div>
      {products && <ProductList products={products}/>}
    </div>
  );
};

export default HomePage;
