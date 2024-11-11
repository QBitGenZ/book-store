import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { Modal as BModal, } from 'react-bootstrap';
import { translate, } from '~/helpers';

function UpdateAddressModal({ data, show, setShow, updateAddress, }) {
  const [formData, setFormData,] = useState({
    id: data?._id,
    name: data?.name || '',
    phone: data?.phone || '',
    address: data?.addressDetail || '',
  });

  React.useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || '',
        phone: data.phone || '',
        address: data.addressDetail || '',
      });
    }
  }, [data,]);
  const handleChange = (e) => {
    const { name, value, } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => setShow(false);
  const handleSave = () => {
    updateAddress({
      id: data._id,
      name: formData.name,
      phone: formData.phone,
      addressDetail: formData.address,
    });
  };

  return (
    <BModal
      aria-labelledby='contained-modal-title-vcenter'
      centered
      show={show}
      onHide={handleClose}
    >
      <BModal.Header>
        <BModal.Title>{translate('update-delivery-address')}</BModal.Title>
      </BModal.Header>
      <BModal.Body>
        <div className='max-w-md mx-auto py-12' hidden={!show}>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>
              Họ và tên người nhận
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500'
              placeholder='Nhập họ và tên người nhận'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Số điện thoại</label>
            <input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500'
              placeholder='Ví dụ: 0979123xxx (10 ký tự số)'
              pattern='[0-9]{10}'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>
              Địa chỉ nhận hàng
            </label>
            <input
              type='text'
              name='address'
              value={formData.address}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500'
              placeholder='Nhập địa chỉ nhận hàng'
              required
            />
          </div>
        </div>
      </BModal.Body>

      <BModal.Footer>
        <div className='flex justify-between gap-2'>
          <button
            type='button'
            className='px-6 w-full py-2 rounded bg-red-500 text-white font-semibold'
            onClick={handleSave}
          >
            Lưu địa chỉ
          </button>
          <button
            type='button'
            className='px-6 py-2 border-red-500 border-1 text-red-500 rounded'
            onClick={handleClose}
          >
            Hủy
          </button>
        </div>
      </BModal.Footer>
    </BModal>
  );
}

UpdateAddressModal.propTypes = {
  data: PropTypes.array.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  updateAddress: PropTypes.func.isRequired,
};

export default UpdateAddressModal;
