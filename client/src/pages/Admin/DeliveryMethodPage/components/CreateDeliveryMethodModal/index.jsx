import React, { useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { TextField, } from '@mui/material';

function CreateDeliveryMethodModal({ show, setShow, createDeliveryMethod, }) {
  const [name, setName,] = useState('');
  const [description, setDescription,] = useState('');
  const [cost, setCost,] = useState('');

  const handleClose = () => setShow(false);
  const handleSave = () => {
    createDeliveryMethod({
      name,
      description,
      cost,
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
        <BModal.Title>{translate('create-delivery-method-label')}</BModal.Title>
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
              label={translate('delivery-method-name-label')}
              size='small'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              className='w-100 mb-3'
              label={translate('description-label')}
              size='small'
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              className='w-100'
              required
              label={translate('cost-label')}
              size='small'
              type='number'
              value={cost}
              onChange={(e) => setCost(e.target.value)}
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

CreateDeliveryMethodModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  createDeliveryMethod: PropTypes.func.isRequired,
};

export default CreateDeliveryMethodModal;
