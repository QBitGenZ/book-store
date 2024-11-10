import React, { useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { MenuItem, TextField, } from '@mui/material';

function CreateDeliveryStatusModal({
  show,
  setShow,
  createDeliveryStatus,
  statusOptions,
}) {
  const [name, setName,] = useState('');
  const [description, setDescription,] = useState('');
  const [nextStatus, setNextStatus,] = useState(null);

  const handleClose = () => setShow(false);

  const handleSave = () => {
    createDeliveryStatus({
      name,
      description,
      nextStatus,
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
        <BModal.Title>{translate('create-delivery-status-label')}</BModal.Title>
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
              label={translate('delivery-status-name-label')}
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
              select
              label={translate('next-status-label')}
              size='small'
              value={nextStatus}
              onChange={(e) => setNextStatus(e.target.value)}
            >
              {statusOptions?.map((status) => (
                <MenuItem key={status._id} value={status._id}>
                  {status.name}
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

CreateDeliveryStatusModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  createDeliveryStatus: PropTypes.func.isRequired,
  statusOptions: PropTypes.array.isRequired,
};

export default CreateDeliveryStatusModal;
