import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency, } from '~/helpers';
import { useSelector, } from 'react-redux';

function ShippingMethod({ deliveryMethods, selectedDeliveryMethod, setSelectedDeliveryMethod, }) {
  const { shop, } = useSelector((state) => state.config);
  return (
    <div className='p-4 rounded-lg bg-white'>
      <h2 className='font-semibold text-lg mb-4 text-left'>PHƯƠNG THỨC VẬN CHUYỂN</h2>
      <div className='space-y-4'>
        {deliveryMethods.map((method) => (
          <div key={method._id} className='flex items-center gap-3 p-3 border rounded'>
            <input
              type='radio'
              id={method._id}
              name='deliveryMethod'
              value={method._id}
              checked={selectedDeliveryMethod?._id === method._id} // This line can safely access _id now
              onChange={() => setSelectedDeliveryMethod(method)}
              className='mr-2'
              style={{
                accentColor: selectedDeliveryMethod?._id === method._id ? shop?.accentColor : '#999',
              }}
            />
            <span className='flex-grow text-left'>
              {method.name}: {formatCurrency(method.cost)}
            </span>
            <span className='text-gray-500'>{method.expectedDelivery}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

ShippingMethod.propTypes = {
  deliveryMethods: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
      expectedDelivery: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedDeliveryMethod: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    expectedDelivery: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedDeliveryMethod: PropTypes.func.isRequired,
};

export default ShippingMethod;
