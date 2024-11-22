import React, { forwardRef, } from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';
import OrderSummary from '~/pages/Admin/DetailOrderPage/Components/OrderSummary';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import { useSelector, } from 'react-redux';
import { useReactToPrint, } from 'react-to-print';

const DetailOrderPage = () => {
  const { shop, } = useSelector((state) => state.config);
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state || {
  };
  const handleBack = () => {
    navigate(-1);
  };

  const printRef = React.useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Order Invoice',
    onAfterPrint: () => console.log('Invoice printed successfully!'),
  });
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
      <OrderInfo order={cart} ref={printRef}/>
      <button
        onClick={handlePrint}
        className='bg-blue-500 dark:bg-navy-600 text-white p-2 rounded mb-6'
      >
        In hóa đơn
      </button>
      {/* <OrderSummary items={cart?.items} shippingCost={cart?.delivery?.cost} />*/}
    </div>
  );
};

export default DetailOrderPage;
// eslint-disable-next-line react/prop-types,react/display-name
const OrderInfo = forwardRef(({ order, }, printRef) => {
  return (
    <div className='' ref={printRef}>
      {/* eslint-disable-next-line react/prop-types */}
      <OrderSummary items={order?.items} shippingCost={order?.delivery?.cost} />
    </div>
  );
});