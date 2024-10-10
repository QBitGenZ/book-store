import React from 'react';
import { formatCurrency, translate, } from '~/helpers';
import PropTypes from 'prop-types';

const TotalCart = (totalPrice) => {
  return (
    <>
      <div className={'flex flex-col gap-3 rounded shadow-md p-3 divide-gray-200 divide-y'}>
        <div className={'flex flex-row justify-between '}>
          <div>
                        Thành tiền
          </div>
          <div className={'flex'}>
            {formatCurrency(totalPrice.totalPrice)}
          </div>
        </div>
        <div className={'flex flex-col gap-3 pt-3'}>
          <div className={'flex flex-row justify-between content-center'}>
            <div>
              <h6>Tổng tiền</h6>
            </div>
            <div className={'flex text-red-500 font-bold text-2xl'}>
              {formatCurrency(totalPrice.totalPrice)}
            </div>
          </div>
          <div className={'w-full'}>
            <button
              className='w-full py-2 rounded bg-red-500 text-white font-semibold'
              onClick={() => {
              }}>
              {translate('Purchase')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

TotalCart.propTypes = {
  totalPrice: PropTypes.number.isRequired,
};

export default TotalCart;