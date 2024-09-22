import React, { useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { TextField, } from '@mui/material';
import { DropImagesInput, } from '~/components';

function CreateAuthorModal({ show, setShow, createAuthor, }) {
  const [fullname, setFullname,] = useState('');
  const [birthday, setBirthday,] = useState('');
  const [nationality, setNationality,] = useState('');
  const [biography, setBiography,] = useState('');
  const [avatar, setAvatar,] = useState([]);

  const handleClose = () => setShow(false);
  const handleSave = () => {
    createAuthor({
      fullname,
      birthday,
      nationality,
      biography,
      avatar: avatar[0],
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
        <BModal.Title>{translate('create-author-label')}</BModal.Title>
      </BModal.Header>
      <BModal.Body>
        <div className='flex flex-col gap-3'>
          <TextField
            className='w-full'
            required
            id='fullname-required'
            label={translate('author-fullname-label')}
            size='small'
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <TextField
            className='w-full'
            id='birthday-required'
            label={translate('author-birthday-label')}
            size='small'
            type='date'
            InputLabelProps={{
              shrink: true,
            }}
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
          <TextField
            className='w-full'
            id='nationality'
            label={translate('author-nationality-label')}
            size='small'
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          />
          <TextField
            className='w-full'
            id='outlined-multiline-flexible'
            label={translate('author-biography-label')}
            multiline
            maxRows={4}
            size='small'
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
          />
          <DropImagesInput
            files={avatar}
            setFiles={setAvatar}
            multiple={false}
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

CreateAuthorModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  createAuthor: PropTypes.func.isRequired,
};

export default CreateAuthorModal;
