import React from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';

import { useSelector, } from 'react-redux';
import parser from 'html-react-parser';

const CustomerEventDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { shop, } = useSelector((state) => state.config);

  const event = location.state || {
  };
  const handleBack = () => {
    navigate(-1);
  };
  console.log(event);

  return (
    <div className={'flex flex-col gap-3 h-max'}>
      <div
        className='left-0 justify-self-start  w-fit'
        onClick={handleBack}
        style={{
          color: shop?.accentColor,
        }}
      >
        <FontAwesomeIcon className='left-0 inset-y-0' icon={faArrowLeft}/>
      </div>

      <div className={'h-full mx-12'}>
        <div className={'flex flex-col gap-3'}>
          {event?.image && (
            <div className={'w-full'}>
              <img
                src={`${process.env.REACT_APP_HOST_IP}/${event.image}`}
                alt={event?.name}
                className='w-full object-cover rounded'
              />
            </div>
          )}
          <div className={'bg-white rounded w-full p-6 space-y-3 shadow-sm'}>
            <div>
              <h2 className={'font-bold '}>
                {event?.title}
              </h2>
            </div>
            <div className={'text-left text-gray-500 text-sm'}>
              <div>
                <span>Ngày bắt đầu: {event?.startDate}</span>
              </div>
              <div>
                <span>Ngày kết thúc: {event?.endDate}</span>
              </div>

            </div>
            <div className={'text-left'}>
              {parser(event.description)}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CustomerEventDetailPage;