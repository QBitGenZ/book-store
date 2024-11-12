import React from 'react';
import PropTypes from 'prop-types';
import EBookCard from '~/components/EBookCard';

const EBookList = ({ title, products = [], }) => {
  return (
    <div className={'rounded-lg shadow-sm bg-white p-4 w-full'}>
      <div>
        {title && (
          <h2 className='text-lg text-left font-bold pb-2 mb-4 border-b'>
            {title}
          </h2>
        )}
      </div>
      <div className='grid grid-cols-5 justify-around gap-3'>
        {products.map((product) => (
          <div
            key={product._id}
            className='w-fit flex justify-center items-center'
          >
            <EBookCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

EBookList.propTypes = {
  title: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EBookList;
