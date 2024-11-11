import React, { useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { TextField, } from '@mui/material';
import { DropImagesInput, } from '~/components';

function CreatePublisherModal({ show, setShow, createPublisher, }) {
  const [name, setName,] = useState('');
  const [logos, setLogos,] = useState([]);
  const [address, setAddress,] = useState('');
  const [website, setWebsite,] = useState('');
  const [email, setEmail,] = useState('');
  const [phone, setPhone,] = useState('');
  const [establishedDate, setEstablishedDate,] = React.useState('');

  const handleClose = () => setShow(false);
  const handleSave = () => {
    createPublisher({
      name,
      logo: logos[0],
      address,
      website,
      email,
      phone,
      establishedDate,
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
        <BModal.Title>{translate('create-publisher-label')}</BModal.Title>
      </BModal.Header>
      <BModal.Body>
        <div className='flex flex-col gap-3'>
          <div className='grid grid-cols-2 gap-3'>
            <div className='flex flex-col gap-3'>
              <TextField
                className='w-full'
                required
                label={translate('publisher-name-label')}
                size='small'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                className='w-full'
                label={translate('address-label')}
                size='small'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                className='w-full'
                label={translate('website-label')}
                size='small'
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-3'>
              <TextField
                className='w-full'
                label={translate('email-label')}
                size='small'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                className='w-full'
                label={translate('phone-label')}
                size='small'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                className='w-full'
                label={translate('established-date-label')}
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
                size='small'
                value={establishedDate}
                onChange={(e) => setEstablishedDate(e.target.value)}
              />
            </div>
          </div>
          <DropImagesInput files={logos} setFiles={setLogos} multiple={false} />
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

CreatePublisherModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  createPublisher: PropTypes.func.isRequired,
};

export default CreatePublisherModal;
