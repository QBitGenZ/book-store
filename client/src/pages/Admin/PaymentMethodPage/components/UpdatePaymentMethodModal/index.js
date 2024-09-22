import React, { useEffect, useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { TextField, } from '@mui/material';

function UpdatePaymentMethodModal({
  paymentMethod,
  show,
  setShow,
  updatePaymentMethod,
}) {
  const [name, setName,] = useState(paymentMethod?.name || '');
  const [description, setDescription,] = useState(
    paymentMethod?.description || ''
  );

  const handleClose = () => setShow(false);

  const handleSave = () => {
    updatePaymentMethod(paymentMethod?._id, {
      name,
      description,
    });
    setShow(false);
  };

  useEffect(() => {
    if (paymentMethod) {
      setName(paymentMethod.name || '');
      setDescription(paymentMethod.description || '');
    }
  }, [paymentMethod,]);

  return (
    <BModal
      aria-labelledby='contained-modal-title-vcenter'
      centered
      show={show}
      onHide={handleClose}
    >
      <BModal.Header closeButton>
        <BModal.Title>{translate('update-payment-method-label')}</BModal.Title>
      </BModal.Header>
      <BModal.Body>
        <div className='flex flex-col gap-3'>
          <TextField
            className='w-full'
            required
            label={translate('payment-method-name-label')}
            size='small'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            className='w-full'
            label={translate('description-label')}
            size='small'
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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

UpdatePaymentMethodModal.propTypes = {
  paymentMethod: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  updatePaymentMethod: PropTypes.func.isRequired,
};

export default UpdatePaymentMethodModal;
