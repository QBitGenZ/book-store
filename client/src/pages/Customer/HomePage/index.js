import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getProductsRequestStart, } from '~/redux/product/slice';
import ProductCard from '~/components/ProductCard';
import { getShopRequestStart, } from '~/redux/config/slice';

const HomePage = () => {
  const { products, } = useSelector((state) => state.product);
  // const { shop, } = useSelector((state) => state.config);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getProductsRequestStart());
    dispatch(getShopRequestStart());
  }, [dispatch,]);

  return (
    <div>
      {products && products.length > 0 ? (
        products.map((product) =>
          product ? <ProductCard product={product} key={product._id}/> : null
        )
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default HomePage;
