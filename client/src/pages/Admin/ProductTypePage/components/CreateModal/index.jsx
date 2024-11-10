import React, { useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { TextField, } from '@mui/material';
import { DropImagesInput, } from '~/components';

function CreateModal({ show, setShow, createProductType, }) {
  const [name, setName,] = useState('');
  const [description, setDescription,] = useState('');
  const [images, setImages,] = useState([]);

  const handleClose = () => setShow(false);
  const handleSave = () => {
    createProductType({
      name,
      description,
      image: images[0],
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
        <BModal.Title>{translate('create-product-type-label')}</BModal.Title>
      </BModal.Header>
      <BModal.Body>
        <div className='flex justify-between gap-3'>
          <TextField
            className='w-full'
            required
            id='outlined-required'
            label={translate('type-name-label')}
            size='small'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            className='w-full'
            id='outlined-multiline-flexible'
            label={translate('description-label')}
            multiline
            maxRows={4}
            size='small'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <DropImagesInput files={images} setFiles={setImages} multiple={false} />
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

CreateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  createProductType: PropTypes.func.isRequired,
};

export default CreateModal;
