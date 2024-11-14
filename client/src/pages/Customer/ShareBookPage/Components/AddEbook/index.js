import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { Modal as BModal, } from 'react-bootstrap';
import { translate, } from '~/helpers';
import { QuiltedImageList, RichTextEditor, } from '~/components';
import { useDispatch, useSelector, } from 'react-redux';
import { createDonationRequestStart, } from '~/redux/donation/slice';

function AddEbook({ show, setShow, }) {
  const [name, setName,] = useState('');
  const [description, setDescription,] = useState('');
  const [images, setImages,] = useState([]);
  const [file, setFile,] = useState(null);
  const [errors, setErrors,] = useState({
  });
  const { shop, } = useSelector((state) => state.config);
  const dispatch = useDispatch();

  const handleRemovePhoto = (imageRemoved) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.url !== imageRemoved.img)
    );
  };

  const handleAddImages = (imagesUpload) => {
    if (imagesUpload.length > 0) {
      const newImages = imagesUpload.map((image) => ({
        file: image.file,
        url: URL.createObjectURL(image.file),
      }));
      setImages((prevImages) => [...prevImages, ...newImages,]);
    }
  };

  const validateFields = () => {
    const newErrors = {
    };
    if (!name.trim()) newErrors.name = translate('name-required');
    if (!file) {
      newErrors.file = translate('file-required');
    } else if (file.type !== 'application/pdf') {
      newErrors.file = translate('file-must-be-pdf');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    setErrors({
    });
    setShow(false);
  };

  const handleSave = () => {
    if (!validateFields()) return;

    const formData = new FormData();
    formData.append('name', name);
    if (description) formData.append('description', description);

    images.forEach((image) => {
      formData.append('images', image.file);
    });

    formData.append('file', file);
    dispatch(createDonationRequestStart(formData));
    handleClose();
  };

  return (
    <BModal
      aria-labelledby='contained-modal-title-vcenter'
      centered
      show={show}
      onHide={handleClose}
    >
      <BModal.Header closeButton>
        <BModal.Title>{translate('sharing-book')}</BModal.Title>
      </BModal.Header>
      <BModal.Body>
        <div className='max-w-md mx-auto'>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Tên sách</label>
            <input
              type='text'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[${shop.accentColor}]`}
              required
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-1'>{translate(errors.name)}</p>
            )}
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Mô tả</label>
            <RichTextEditor content={description} setContent={setDescription} />
          </div>
          <QuiltedImageList
            itemData={images.map((image) => ({
              img: image.url,
            }))}
            actions={[
              {
                label: translate('remove-image'),
                func: handleRemovePhoto,
              },
            ]}
            onAddImages={handleAddImages}
          />
          <div className='flex flex-col gap-3'>
            <input
              type='file'
              name='file'
              onChange={(e) => setFile(e.target.files[0])}
            />
            {errors.file && (
              <p className='text-red-500 text-sm mt-1'>{translate(errors.file)}</p>
            )}
          </div>
        </div>
      </BModal.Body>
      <BModal.Footer>
        <div className='flex flex-row gap-3 w-full'>
          <button
            type='button'
            className='px-6 w-full py-2 rounded font-semibold border-2'
            style={{
              borderColor: shop?.primaryColor || 'red',
              color: shop?.primaryColor || 'red',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = shop?.accentColor || 'darkred';
              e.currentTarget.style.borderColor =
                shop?.accentColor || 'darkred';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = shop?.primaryColor || 'red';
              e.currentTarget.style.borderColor = shop?.primaryColor || 'red';
            }}
            onClick={handleClose}
          >
            {translate('cancel')}
          </button>
          <button
            type='button'
            className='px-6 w-full py-2 rounded font-semibold text-white'
            style={{
              backgroundColor: shop?.primaryColor || 'red',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor =
                shop?.accentColor || 'darkred';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor =
                shop?.primaryColor || 'red';
            }}
            onClick={handleSave}
          >
            {translate('save')}
          </button>
        </div>
      </BModal.Footer>
    </BModal>
  );
}

AddEbook.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};

export default AddEbook;
