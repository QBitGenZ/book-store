import React from 'react';
import { useParams, } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import { getProductsRequestStart, } from '~/redux/product/slice';
import { ProductList, } from '~/components';

const SearchResultPage = () => {
  const { query, } = useParams();
  const dispatch = useDispatch();

  const [orderBy,] = React.useState('');
  const [descending,] = React.useState(true);
  const [page,] = React.useState(1);
  const [limit,] = React.useState(100);

  const { products, meta, } = useSelector((state) => state.product);

  React.useEffect(() => {
    dispatch(getProductsRequestStart({
      search: query,
      orderBy,
      page,
      limit,
      descending,
    }));
    console.log(products, meta);
  }, [query,]);

  return (
    <div>
      <ProductList products={products}/>

    </div>
  );
};

export default SearchResultPage;
