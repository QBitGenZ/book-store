import React from 'react';
import ProductCard from '~/components/ProductCard';
import { useDispatch, useSelector, } from 'react-redux';
import { getProductsRequestStart, } from '~/redux/product/slice';

const HomePage = () => {
  const { products, } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const getProduct = () => {
    dispatch(getProductsRequestStart(

    ));
  };

  React.useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <ProductCard product={products[0]}></ProductCard>
    </div>
  );
};

export default HomePage;
