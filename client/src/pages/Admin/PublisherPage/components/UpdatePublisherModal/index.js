import React, { useEffect, useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { TextField, } from '@mui/material';
import { DropImagesInput, } from '~/components';

function UpdatePublisherModal({ publisher, show, setShow, updatePublisher, }) {
  const [name, setName,] = useState(publisher?.name);
  const [address, setAddress,] = useState(publisher?.address);
  const [website, setWebsite,] = useState(publisher?.website);
  const [email, setEmail,] = useState(publisher?.email);
  const [phone, setPhone,] = useState(publisher?.phone);
  const [establishmentDate, setEstablishmentDate,] = useState(
    publisher?.establishmentDate
  );
  const [logos, setLogos,] = useState([]);

  const handleClose = () => setShow(false);

  const handleSave = () => {
    updatePublisher(publisher?._id, {
      name,
      address,
      website,
      email,
      phone,
      establishmentDate,
      logo: logos[0],
    });
    setShow(false);
  };

  useEffect(() => {
    if (publisher) {
      setName(publisher.name || '');
      setAddress(publisher.address || '');
      setWebsite(publisher.website || '');
      setEmail(publisher.email || '');
      setPhone(publisher.phone || '');
      setEstablishmentDate(publisher.establishmentDate || '');
    }
  }, [publisher,]);

  return (
    <BModal
      aria-labelledby='contained-modal-title-vcenter'
      centered
      show={show}
      onHide={handleClose}
    >
      <BModal.Header closeButton>
        <BModal.Title>{translate('update-publisher-label')}</BModal.Title>
      </BModal.Header>
      <BModal.Body>
        <div className='flex flex-col gap-3'>
          <TextField
            className='w-full'
            required
            id='outlined-required'
            label={translate('publisher-name-label')}
            size='small'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            className='w-full'
            id='outlined-required'
            label={translate('address-label')}
            size='small'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            className='w-full'
            id='outlined-required'
            label={translate('website-label')}
            size='small'
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <TextField
            className='w-full'
            id='outlined-required'
            label={translate('email-label')}
            size='small'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className='w-full'
            id='outlined-required'
            label={translate('phone-label')}
            size='small'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            className='w-full'
            id='outlined-required'
            label={translate('establishment-date-label')}
            type='date'
            InputLabelProps={{
              shrink: true,
            }}
            size='small'
            value={establishmentDate}
            onChange={(e) => setEstablishmentDate(e.target.value)}
          />
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

UpdatePublisherModal.propTypes = {
  publisher: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  updatePublisher: PropTypes.func.isRequired,
};

export default UpdatePublisherModal;
