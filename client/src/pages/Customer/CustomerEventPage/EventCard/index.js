import React from 'react';
import PropTypes from 'prop-types';
import { formatDateDMY, } from '~/helpers';

function EventCard({ event, }) {
  return (
    <div className={'flex flex-col gap-2 mx-3 my-2 text-left border-b'}>
      <div className={' text-2xl font-bold'}>{event.title}</div>
      <div className={'text-sm text-gray-400'}>
        Từ {formatDateDMY(event.startDate)} đến {formatDateDMY(event.endDate)}
      </div>
      <div>
        <p className={'text-sm break-words hyphens-manual'}>
          {event.description.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>

      <div></div>
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
};
export default EventCard;
