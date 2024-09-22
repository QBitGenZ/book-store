import React, { useEffect, useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { TextField, } from '@mui/material';
import { DropImagesInput, } from '~/components';

function UpdateModal({ productType, show, setShow, updateProductType, }) {
  const [name, setName,] = useState(productType?.name);
  const [description, setDescription,] = useState(productType?.description);
  const [images, setImages,] = useState([]);

  const handleClose = () => setShow(false);
  const handleSave = () => {
    updateProductType(productType?._id, {
      name,
      description,
      image: images[0],
    });
  };

  useEffect(() => {
    if (productType) {
      setName(productType.name || '');
      setDescription(productType.description || '');
    }
  }, [productType,]);

  return (
    <BModal
      aria-labelledby='contained-modal-title-vcenter'
      centered
      show={show}
      onHide={handleClose}
    >
      <BModal.Header closeButton>
        <BModal.Title>{translate('update-product-type-label')}</BModal.Title>
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

UpdateModal.propTypes = {
  productType: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  updateProductType: PropTypes.func.isRequired,
};

export default UpdateModal;
