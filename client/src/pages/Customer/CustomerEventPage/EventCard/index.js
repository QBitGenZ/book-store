import React from 'react';
import PropTypes from 'prop-types';
import { formatDateDMY, } from '~/helpers';
import parser from 'html-react-parser';

function EventCard({ event, }) {
  return (
    <div className={'flex flex-col gap-2 mx-3 my-2 text-left border-b bg-white rounded shadow-sm'}>
      <div className={'w-full'}>
        <img
          src={`${process.env.REACT_APP_HOST_IP}/${event.image}`}
          alt={event?.name}
          className='w-full h-60 object-cover rounded-t'
        />
      </div>
      <div className={'mx-4 my-2'}>
        <div className={' text-lg font-bold line-clamp-1'}>{event.title}</div>
        <div className={'text-sm text-gray-400'}>
          Từ {formatDateDMY(event.startDate)} đến {formatDateDMY(event.endDate)}
        </div>
        <div>
          <p className={'text-sm break-words hyphens-manual line-clamp-3'}>
            {parser(event.description)}
          </p>
        </div>
      </div>

    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
};
export default EventCard;
