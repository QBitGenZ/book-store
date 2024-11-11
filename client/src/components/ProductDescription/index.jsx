import React from 'react';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';

const ProductDescription = ({ title, data, }) => {

  return (
    <>
      <div className={'flex flex-col gap-3'}>
        {data && (
          <div className='p-6 rounded max-w-full h-auto bg-white shadow-sm'>
            <h2 className='text-base font-semibold mb-4 text-left'>{title ? translate(title) : translate('product-description')}</h2>
            <div className={'w-full'}>
              <p className={'text-left break-words hyphens-manual'}>
                {data.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br/>
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
