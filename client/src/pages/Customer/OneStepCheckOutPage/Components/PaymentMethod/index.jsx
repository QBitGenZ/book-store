import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, } from 'react-redux';

function PaymentMethod({
  paymentMethods,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}) {
  const { shop, } = useSelector((state) => state.config);
  return (
    <div className='p-4 rounded-lg bg-white'>
      <h2 className='font-semibold text-lg text-left mb-4'>
        Phương thức thanh toán
      </h2>
      <div className='space-y-3'>
        {paymentMethods.map((method) => (
          <div
            key={method._id}
            className='flex items-center gap-3 p-3 border rounded'
            onClick={() => setSelectedPaymentMethod(method)}
          >
            <input
              type='radio'
              name='payment'
              value={method._id}
              checked={selectedPaymentMethod?._id === method._id}
              onChange={() => setSelectedPaymentMethod(method)}
              style={{
                accentColor:
                  selectedPaymentMethod?._id === method._id
                    ? shop?.accentColor
                    : '#999',
              }}
            />
            <span>{method.name}</span>
            {/* <span>{method.description}</span>*/}
          </div>
        ))}
      </div>
    </div>
  );
}

PaymentMethod.propTypes = {
  paymentMethods: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
      details: PropTypes.string,
    })
  ).isRequired,
  selectedPaymentMethod: PropTypes.string.isRequired,
  setSelectedPaymentMethod: PropTypes.func.isRequired,
};

export default PaymentMethod;
