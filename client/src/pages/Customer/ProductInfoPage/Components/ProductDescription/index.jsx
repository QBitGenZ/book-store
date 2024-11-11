import React from 'react';
import PropTypes from 'prop-types';

const ProductDescription = ({ title, data, }) => {
  // const toKebabCase = (str) => {
  //   return str
  //     .replace(/([a-z])([A-Z])/g, '$1-$2')
  //     .replace(/[\s_]+/g, '-')
  //     .replace(/[^a-zA-Z0-9-]+/g, '')
  //     .toLowerCase();
  // };
  return (
    <>
      <div className={'flex flex-col gap-3'}>
        {data && (
          <div className='p-6 rounded max-w-full h-auto bg-white shadow-sm'>
            <h2 className='text-xl font-bold mb-4 text-left'>{title}</h2>
            <div className={'w-full'}>
              <p className={'text-left break-words hyphens-manual'}>
                {data.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

ProductDescription.propTypes = {
  title: PropTypes.string,
  data: PropTypes.string.isRequired,
};

export default ProductDescription;
