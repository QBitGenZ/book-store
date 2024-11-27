import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';

function CurrentEvent({ event, }) {
  // console.log(event);
  const [showPopup, setShowPopup,] = React.useState(false);
  return (
    <>
      <div className='fixed inset-x-0 bottom-0 p-4 z-50'
        onMouseEnter={() => setShowPopup(true)}
        onMouseLeave={() => setShowPopup(false)}
      >
        <div className='rounded-lg bg-[#D8EFFC] px-4 py-3 text-[#250059] shadow-lg'>
          <p className='text-center text-sm font-medium mb-0'>
            {event?.title}
            {/* <a href='#' className='inline-block underline'> Check out this new course! </a>*/}
          </p>
          {showPopup && (<p className='text-left font-normal text-xs mb-0 space-y-0'>
            {parser(event?.description)}
          </p>)}
        </div>
      </div>
    </>
  );
}

CurrentEvent.propTypes = {
  event: PropTypes.object.isRequired,
};

export default CurrentEvent;