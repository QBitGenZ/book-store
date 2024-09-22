import React, { useEffect, useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { TextField, } from '@mui/material';

function UpdateDeliveryMethodModal({
  deliveryMethod,
  show,
  setShow,
  updateDeliveryMethod,
}) {
  const [name, setName,] = useState(deliveryMethod?.name || '');
  const [description, setDescription,] = useState(
    deliveryMethod?.description || ''
  );
  const [cost, setCost,] = useState(deliveryMethod?.cost || '');

  const handleClose = () => setShow(false);

  const handleSave = () => {
    updateDeliveryMethod(deliveryMethod?._id, {
      name,
      description,
      cost,
    });
    setShow(false);
  };

  useEffect(() => {
    if (deliveryMethod) {
      setName(deliveryMethod.name || '');
      setDescription(deliveryMethod.description || '');
      setCost(deliveryMethod.cost || '');
    }
  }, [deliveryMethod,]);

  return (
    <BModal
      aria-labelledby='contained-modal-title-vcenter'
      centered
      show={show}
      onHide={handleClose}
    >
      <BModal.Header closeButton>
        <BModal.Title>{translate('update-delivery-method-label')}</BModal.Title>
      </BModal.Header>
      <BModal.Body>
        <div className='flex flex-col gap-3'>
          <TextField
            className='w-full'
            required
            label={translate('delivery-method-name-label')}
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
          <TextField
            className='w-full'
            required
            label={translate('cost-label')}
            size='small'
            type='number'
            value={cost}
            onChange={(e) => setCost(e.target.value)}
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

UpdateDeliveryMethodModal.propTypes = {
  deliveryMethod: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  updateDeliveryMethod: PropTypes.func.isRequired,
};

export default UpdateDeliveryMethodModal;
