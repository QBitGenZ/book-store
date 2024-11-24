import React from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';
import OrderSummary from './Components/OrderSummary';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import { useSelector, } from 'react-redux';
// import { useReactToPrint, } from 'react-to-print';

const OrderDetailPage = () => {
  const { shop, } = useSelector((state) => state.config);
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state || {
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className={'flex flex-col gap-3'}>

      <div
        className='left-0 flex justify-start'
        onClick={handleBack}
        style={{
          color: shop?.accentColor,
        }}
      >
        <FontAwesomeIcon className='left-0 inset-y-0' icon={faArrowLeft}/>
      </div>
      <OrderSummary order={cart} shippingCost={cart?.delivery?.cost} />
    </div>

  );
};

export default OrderDetailPage;
