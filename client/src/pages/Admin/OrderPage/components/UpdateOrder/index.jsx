import React, { useEffect, useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { MenuItem, TextField, } from '@mui/material';
import { useDispatch, useSelector, } from 'react-redux';
import { getDeliveryStatusesRequestStart, } from '~/redux/deliveryStatus/slice';
import { getPaymentStatusesRequestStart, } from '~/redux/paymentStatus/slice';

function UpdateOrder({ show, setShow, updateOrder, order, }) {
  const [deliveryStatus, setDeliveryStatus,] = useState(
    order?.deliveryStatus || ''
  );
  const [paymentStatus, setPaymentStatus,] = useState(
    order?.paymentStatus || ''
  );
  const dispatch = useDispatch();
  const { deliveryStatuses, } = useSelector((state) => state.deliveryStatus);
  const { paymentStatuses, } = useSelector((state) => state.paymentStatus);

  const handleClose = () => setShow(false);

  const handleSave = () => {
    updateOrder(order?._id, {
      deliveryStatus,
      paymentStatus,
    });
    setShow(false);
  };

  useEffect(() => {
    if (order) {
      console.log(order);
      setDeliveryStatus(order.deliveryStatus || '');
      setPaymentStatus(order.paymentStatus || '');
    }
    getDeliveryStatus();
    getPaymentStatus();
  }, [order,]);

  const getDeliveryStatus = () => {
    dispatch(
      getDeliveryStatusesRequestStart({
        limit: 1000,
        page: 1,
      })
    );
  };

  const getPaymentStatus = () => {
    dispatch(
      getPaymentStatusesRequestStart({
        limit: 1000,
        page: 1,
      })
    );
  };

  console.log(deliveryStatus, paymentStatus);

  return (
    <BModal
      aria-labelledby='contained-modal-title-vcenter'
      centered
      show={show}
      onHide={handleClose}
    >
      <BModal.Header closeButton>
        <BModal.Title>{translate('update-delivery-status-label')}</BModal.Title>
      </BModal.Header>
      <BModal.Body>
        <div className='flex flex-wrap'>
          <div
            className='flex-fill d-flex flex-column p-2'
            style={{
              minWidth: '50%',
            }}
          >
            <TextField
              select
              label={translate('delivery-status-label')}
              value={deliveryStatus}
              onChange={(e) => setDeliveryStatus(e.target.value)}
              fullWidth
              variant='outlined'
            >
              {deliveryStatuses?.map((value) => (
                <MenuItem key={value?._id} value={value?._id}>
                  {value?.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div
            className='flex-fill d-flex flex-column p-2'
            style={{
              minWidth: '50%',
            }}
          >
            <TextField
              select
              label={translate('payment-status-label')}
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              fullWidth
              variant='outlined'
            >
              {paymentStatuses?.map((value) => (
                <MenuItem key={value?._id} value={value?._id}>
                  {value?.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
      </BModal.Body>
      <BModal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          {translate('cancel-btn-label')}
        </Button>
        <Button variant='primary' onClick={handleSave}>
          {translate('save-btn-label')}
        </Button>
      </BModal.Footer>
    </BModal>
  );
}

UpdateOrder.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired, // The current delivery status object being edited
};

export default UpdateOrder;
