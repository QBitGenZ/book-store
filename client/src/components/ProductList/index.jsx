// import React from 'react';
// import PropTypes from 'prop-types';
// import { EBookCard, ProductCard, } from '~/components';
//
// const ProductList = ({ title, products = [], }) => {
//   return (
//     <div className={'rounded-lg shadow-sm bg-white p-4 w-full'}>
//       <div>
//         {title && (
//           <h2 className='text-lg text-left font-bold pb-2 mb-4 border-b'>
//             {title}
//           </h2>
//         )}
//       </div>
//       <div className='grid grid-cols-5 justify-around gap-3'>
//         {products.map((product) => (
//           <div
//             key={product._id}
//             className='w-fit flex justify-center items-center'
//           >
//             {product?.isEbook ?
//               (<EBookCard product={product} />)
//               : (
//                 <ProductCard product={product} />
//               )}
//
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
//
// ProductList.propTypes = {
//   title: PropTypes.string,
//   products: PropTypes.arrayOf(PropTypes.object).isRequired,
// };
//
// export default ProductList;

import React from 'react';
import PropTypes from 'prop-types';
import { EBookCard, ProductCard, } from '~/components';

const ProductList = ({ title, products = [], }) => {
  return (
    <div className='rounded-lg shadow-sm bg-white p-4 w-full'>
      {title && (
        <h2 className='text-lg text-left font-bold pb-2 mb-4 border-b'>{title}</h2>
      )}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {products.map((product) => (
          <div key={product._id} className='flex justify-center items-center'>
            {product?.isEbook ? (
              <EBookCard product={product} />
            ) : (
              <ProductCard product={product} />
            )}
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
