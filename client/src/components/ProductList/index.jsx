import React from 'react';
import PropTypes from 'prop-types';
import { ProductCard, } from '~/components';

const ProductList = ({ products = [], }) => {
  return (
    <div className='flex flex-wrap justify-start gap-3 p-2 rounded-lg shadow-lg bg-white'>
      {products.map((product) => (
        <div key={product._id} className='w-fit'>
          <ProductCard product={product}/>
        </div>
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductList;
