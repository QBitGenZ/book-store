// UpdateEventModal.jsx
import React, { useEffect, useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { TextField, } from '@mui/material';

function UpdateEventModal({ event, show, setShow, updateEvent, }) {
  const [title, setTitle,] = useState(event?.title);
  const [description, setDescription,] = useState(event?.description);
  const [startDate, setStartDate,] = useState(event?.startDate);
  const [endDate, setEndDate,] = useState(event?.endDate);
  // const [images, setImages,] = useState([]);

  const handleClose = () => setShow(false);
  const handleSave = () => {
    updateEvent(event?._id, {
      title,
      description,
      startDate,
      endDate,
      // image: images[0],
    });
  };

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDescription(event.description || '');
      setStartDate(event.startDate);
      setEndDate(event.endDate);
    }
  }, [event,]);

  return (
    <BModal aria-labelledby='contained-modal-title-vcenter' centered show={show} onHide={handleClose}>
      <BModal.Header closeButton>
        <BModal.Title>{translate('update-event-label')}</BModal.Title>
      </BModal.Header>
      <BModal.Body>
        <div className='flex justify-between gap-3 mb-3'>
          <TextField
            className='w-full'
            required
            id='outlined-required'
            label={translate('event-title-label')}
            size='small'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
        <div className='flex justify-between gap-3'>
          <TextField
            className='w-full'
            id='birthday-required'
            label={translate('start-date-label')}
            size='small'
            type='date'
            InputLabelProps={{
              shrink: true,
            }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            className='w-full'
            id='birthday-required'
            label={translate('start-date-label')}
            size='small'
            type='date'
            InputLabelProps={{
              shrink: true,
            }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        {/* <div className='flex justify-between gap-3'>*/}
        {/*  <DatePicker*/}
        {/*    label={translate('start-date-label')}*/}
        {/*    value={startDate}*/}
        {/*    onChange={(newValue) => setStartDate(newValue)}*/}
        {/*    format='yyyy-MM-dd'*/}
        {/*  />*/}
        {/*  <DatePicker*/}
        {/*    label={translate('end-date-label')}*/}
        {/*    value={endDate}*/}
        {/*    onChange={(newValue) => setEndDate(newValue)}*/}
        {/*    format='yyyy-MM-dd'*/}
        {/*  />*/}
        {/* </div>*/}
        {/* <DropImagesInput files={images} setFiles={setImages} multiple={false}/>*/}
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

UpdateEventModal.propTypes = {
  event: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
};

export default UpdateEventModal;