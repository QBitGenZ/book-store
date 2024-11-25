// CreateEventModal.jsx
import React, { useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { TextField, } from '@mui/material';
import { DropImagesInput, RichTextEditor, } from '~/components';

function CreateEventModal({ show, setShow, createEvent, }) {
  const [title, setTitle,] = useState('');
  const [description, setDescription,] = useState('');
  const [startDate, setStartDate,] = useState(null);
  const [endDate, setEndDate,] = useState(null);
  const [images, setImages,] = useState([]);

  const handleClose = () => setShow(false);
  const handleSave = () => {
    createEvent({
      title,
      description,
      startDate,
      endDate,
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
        <BModal.Title>{translate('create-event-label')}</BModal.Title>
      </BModal.Header>

      <BModal.Body>
        <div className='flex justify-between gap-3 mb-3 w-full'>
          <TextField
            className='w-full'
            required
            label={translate('event-title-label')}
            size='small'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
        <div className='flex justify-between gap-3 mb-3'>
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
        <div className='flex justify-between gap-3'>
          {/* <TextField*/}
          {/*  className='w-full'*/}
          {/*  label={translate('description-label')}*/}
          {/*  size='small'*/}
          {/*  value={description}*/}
          {/*  onChange={(e) => setDescription(e.target.value)}*/}
          {/*  multiline*/}
          {/*  rows={5}*/}
          {/* />*/}
          <div className={'text-left w-full'}>
            {/* {translate('description')}*/}
            <RichTextEditor
              content={description}
              setContent={setDescription}
            ></RichTextEditor>
          </div>

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

CreateEventModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired,
};

export default CreateEventModal;
