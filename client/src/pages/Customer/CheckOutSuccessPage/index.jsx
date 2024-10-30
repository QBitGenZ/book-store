import { translate, } from '~/helpers';
import React from 'react';
import { clientRoutes, } from '~/configs/routes';
import { useNavigate, } from 'react-router-dom';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faCircleCheck, } from '@fortawesome/free-regular-svg-icons';

const checkOutSuccessPage = () => {
  const nav = useNavigate();
  const goToHome = () => {
    nav(clientRoutes.home);
  };
  return (
    <div className={'rounded shadow-sm bg-white w-full flex flex-col items-center p-16'}>
      <div className={'text-green-600 mb-4'}>
        <FontAwesomeIcon icon={faCircleCheck} className={'h-32'}/>
      </div>
      <p>{translate('Đơn hàng của bạn đã đặt thành công.')}</p>
      <button
        className='w-fit py-2 px-4 rounded shadow-md bg-red-600 text-white font-semibold mt-4'
        onClick={goToHome}>
        {translate('Về Trang chủ')}
      </button>
    </div>
  );
};

export default checkOutSuccessPage;