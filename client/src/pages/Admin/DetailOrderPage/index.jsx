import React from 'react';
import { useLocation, } from 'react-router-dom';
import OrderSummary from '~/pages/Admin/DetailOrderPage/Components/OrderSummary';

const DetailOrderPage = () => {
  const location = useLocation();
  const cart = location.state || {
  };
  return (
    <OrderSummary items={cart?.items} shippingCost={cart?.delivery?.cost}/>
  );
};

export default DetailOrderPage;
