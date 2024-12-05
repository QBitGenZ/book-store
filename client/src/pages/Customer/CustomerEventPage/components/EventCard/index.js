// import React from 'react';
// import PropTypes from 'prop-types';
// import { formatDateDMY, } from '~/helpers';
// import parser from 'html-react-parser';
//
// function EventCard({ event, }) {
//   return (
//     <div className={'opacity-75 flex flex-col gap-2 mx-3 my-2 text-left border-b bg-white rounded shadow-sm'}>
//       <div className={'w-full'}>
//         <img
//           src={`${process.env.REACT_APP_HOST_IP}/${event.image}`}
//           alt={event?.title}
//           className='w-full h-60 object-cover rounded-t'
//         />
//       </div>
//       <div className={'mx-4 my-2'}>
//         <div className={' text-lg font-bold line-clamp-1'}>{event.title}</div>
//         <div className={'text-sm text-gray-400'}>
//           Từ {formatDateDMY(event.startDate)} đến {formatDateDMY(event.endDate)}
//         </div>
//         <div>
//           <p className={'text-sm break-words hyphens-manual line-clamp-3'}>
//             {parser(event.description)}
//           </p>
//         </div>
//       </div>
//
//     </div>
//   );
// }
//
// EventCard.propTypes = {
//   event: PropTypes.object.isRequired,
// };
// export default EventCard;

import React from 'react';
import PropTypes from 'prop-types';
import { formatDateDMY, } from '~/helpers';
import parser from 'html-react-parser';

function EventCard({ event, }) {
  return (
    <div className='opacity-90 flex flex-col gap-2 mx-auto my-4 p-4 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow w-full max-w-sm sm:max-w-md lg:max-w-lg'>
      {/* Image Section */}
      <div className='w-full'>
        <img
          src={`${process.env.REACT_APP_HOST_IP}/${event.image}`}
          alt={event?.title}
          className='w-full h-40 sm:h-60 object-cover rounded-t-md'
        />
      </div>

      {/* Text Content */}
      <div className='px-2 sm:px-4 py-2'>
        <h3 className='text-base sm:text-lg font-semibold truncate'>
          {event.title}
        </h3>
        <p className='text-xs sm:text-sm text-gray-500 mt-1'>
          Từ {formatDateDMY(event.startDate)} đến {formatDateDMY(event.endDate)}
        </p>
        <p className='text-sm text-gray-700 mt-2 line-clamp-3'>
          {parser(event.description)}
        </p>
      </div>
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventCard;
