import React, { useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { TextField, } from '@mui/material';

function CreatePaymentMethodModal({ show, setShow, createPaymentMethod, }) {
  const [name, setName,] = useState('');
  const [description, setDescription,] = useState('');

  const handleClose = () => setShow(false);
  const handleSave = () => {
    createPaymentMethod({
      name,
      description,
    });
  };

  return (
    <BModal
      aria-labelledby='contained-modal-title-vcenter'
      centered
      show={show}
      onHide={handleClose}
    >
      <BModal.Header closeButton>
        <BModal.Title>{translate('create-payment-method-label')}</BModal.Title>
      </BModal.Header>
      <BModal.Body>
        <div className='d-flex flex-wrap'>
          <div
            className='flex-fill d-flex flex-column p-2'
            style={{
              minWidth: '50%',
            }}
          >
            <TextField
              className='w-100 mb-3'
              required
              label={translate('payment-method-name-label')}
              size='small'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              className='w-100'
              label={translate('description-label')}
              size='small'
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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

CreatePaymentMethodModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  createPaymentMethod: PropTypes.func.isRequired,
};

export default CreatePaymentMethodModal;
