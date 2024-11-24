import React from 'react';
import { formatCurrency, translate, } from '~/helpers';
import PropTypes from 'prop-types';
import { clientRoutes, } from '~/configs/routes';
import { useNavigate, } from 'react-router-dom';

const TotalCart = ({ totalPrice, totalProduct, }) => {
  // console.log(totalProduct, totalPrice);
  const nav = useNavigate();
  const handlePurchase = () => {
    if (totalProduct) {
      nav(clientRoutes.oneStepCheckOut);
    }
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
      <div
        className={
          'flex flex-col gap-3 rounded bg-white shadow-md p-3 divide-gray-200 divide-y'
        }
      >
        <div className={'flex flex-row justify-between '}>
          <div>Thành tiền</div>
          <div className={'flex'}>{formatCurrency(totalPrice ?? 0)}</div>
        </div>
        <div className={'flex flex-col gap-3 pt-3'}>
          <div className={'flex flex-row justify-between content-center'}>
            <div>
              <h6>Tổng tiền</h6>
            </div>
            <div className={'flex text-red-500 font-bold text-2xl'}>
              {formatCurrency(totalPrice ?? 0)}
            </div>
          </div>
          <div className={'w-full'}>
            <button
              className={`w-full py-2 rounded font-semibold ${
                totalProduct === 0
                  ? 'bg-gray-200 text-white'
                  : 'bg-red-500 text-white'
              }`}
              onClick={safeHandlePurchase}
              disabled={totalProduct === 0} // Disable when totalProduct is 0
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
  totalProduct: PropTypes.number.isRequired,
  // handlePurchase: PropTypes.func.isRequired,
};

export default TotalCart;
