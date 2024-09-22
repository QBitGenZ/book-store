import React, { useEffect, useState, } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal as BModal, } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { translate, } from '~/helpers';
import { TextField, } from '@mui/material';
import { DropImagesInput, } from '~/components';

function UpdateAuthorModal({ author, show, setShow, updateAuthor, }) {
  const [fullname, setFullname,] = useState(author?.fullname || '');
  const [birthday, setBirthday,] = useState(
    author?.birthday ? new Date(author?.birthday) : null
  );
  const [nationality, setNationality,] = useState(author?.nationality || '');
  const [biography, setBiography,] = useState(author?.biography || '');
  const [avatar, setAvatar,] = useState([]);

  const handleClose = () => setShow(false);
  const handleSave = () => {
    updateAuthor(author?._id, {
      fullname,
      birthday,
      nationality,
      biography,
      avatar: avatar[0],
    });
    setShow(false);
  };

  useEffect(() => {
    if (author) {
      setFullname(author.fullname || '');
      setBirthday(author.birthday ? new Date(author.birthday) : null);
      setNationality(author.nationality || '');
      setBiography(author.biography || '');
    }
  }, [author,]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const year = dateString.getFullYear();
    const month = String(dateString.getMonth() + 1).padStart(2, '0');
    const day = String(dateString.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e) => {
    const { value, } = e.target;
    const [year, month, day,] = value.split('-');
    setBirthday(new Date(year, month - 1, day));
  };

  return (
    <BModal
      aria-labelledby='contained-modal-title-vcenter'
      centered
      show={show}
      onHide={handleClose}
    >
      <BModal.Header closeButton>
        <BModal.Title>{translate('update-author-label')}</BModal.Title>
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
            required
            id='birthday-required'
            label={translate('author-birthday-label')}
            size='small'
            type='date'
            InputLabelProps={{
              shrink: true,
            }}
            value={formatDate(birthday)}
            onChange={handleDateChange}
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

UpdateAuthorModal.propTypes = {
  author: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  updateAuthor: PropTypes.func.isRequired,
};

export default UpdateAuthorModal;
