import React from 'react';
import { useParams, } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import { getProductsRequestStart, } from '~/redux/product/slice';
import { ProductList, } from '~/components';

const CategoriesPage = () => {
  const { query, } = useParams();
  const dispatch = useDispatch();

  const { products, meta, } = useSelector((state) => state.product);

  React.useEffect(() => {
    dispatch(getProductsRequestStart({
      search: query,
    }));
    console.log(products, meta);
    // TODO: chỉnh lại thành theo danh mục
  }, [query,]);

  return (
    <div>
      <ProductList products={products}/>

    </div>
  );
};

export default CategoriesPage;