import React from 'react';
import { formatCurrency, translate, } from '~/helpers';
import PropTypes from 'prop-types';
import { clientRoutes, } from '~/configs/routes';
import { useNavigate, } from 'react-router-dom';

const TotalCart = (totalPrice) => {
  const nav = useNavigate();
  const handlePurchase = () => {
    nav(clientRoutes.oneStepCheckOut);
  };
  const safeHandlePurchase = () => {
    if (typeof handlePurchase === 'function') {
      handlePurchase();
    } else {
      console.error('handlePurchase is not a function');
    }
  };
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
              onClick={safeHandlePurchase}
            >
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
  // handlePurchase: PropTypes.func.isRequired,
};

export default TotalCart;