import React, { useEffect, useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { TextField, MenuItem, } from '@mui/material';

function UpdateDeliveryStatusModal({
  show,
  setShow,
  updateDeliveryStatus,
  deliveryStatus,
  statusOptions,
}) {
  const [name, setName,] = useState(deliveryStatus?.name || '');
  const [description, setDescription,] = useState(
    deliveryStatus?.description || ''
  );
  const [nextStatus, setNextStatus,] = useState(
    deliveryStatus?.nextStatus || ''
  );

  const handleClose = () => setShow(false);

  const handleSave = () => {
    updateDeliveryStatus(deliveryStatus?._id, {
      name,
      description,
      nextStatus,
    });
    setShow(false);
  };

  useEffect(() => {
    if (deliveryStatus) {
      setName(deliveryStatus.name || '');
      setDescription(deliveryStatus.description || '');
      setNextStatus(deliveryStatus.nextStatus || '');
    }
  }, [deliveryStatus,]);

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

UpdateDeliveryStatusModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  updateDeliveryStatus: PropTypes.func.isRequired,
  deliveryStatus: PropTypes.object.isRequired, // The current delivery status object being edited
  statusOptions: PropTypes.array.isRequired, // Array of available statuses
};

export default UpdateDeliveryStatusModal;
