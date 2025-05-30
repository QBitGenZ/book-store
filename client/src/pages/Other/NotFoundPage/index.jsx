import React from 'react';

const NotFoundPage = () => {
  return (
    <div id='not-found-page' className='relative top-0 left-0'>
      <img
        className='max-h-screen max-w-screen absolute top-1/2 left-1/2 -translate-x-1/2'
        src={`${process.env.PUBLIC_URL}/assets/pages/other/404.png`}
      />
    </div>
  );
};

export default NotFoundPage;
