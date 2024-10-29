import React from 'react';
import PropTypes from 'prop-types';
import { ProductCard, } from '~/components';

const ProductList = ({ title, products = [], }) => {
  return (
    <div className={'rounded-lg shadow-sm bg-white p-4'}>
      <div>
        {title && <h2 className='text-lg text-left font-bold pb-2 mb-4 border-b'>{title}</h2>}
      </div>
      <div className='grid grid-cols-5 justify-start gap-3'>

        {products.map((product) => (
          <div key={product._id} className='w-fit'>
            <ProductCard product={product}/>
          </div>
        ))}
      </div>
    </div>
  );
};

ProductList.propTypes = {
  title: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductList;
