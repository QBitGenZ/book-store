import React from 'react';
import PropTypes from 'prop-types';

function StatisticCard({ name, value, icon, color, }) {
  const nf = new Intl.NumberFormat();

  return (
    <div className='relative w-full rounded bg-white px-4 py-3 flex flex-col items-start gap-2 text-left shadow-sm'>
      {/* Background Image with Blur */}
      <div className='absolute inset-0 rounded'>
        <div
          className='absolute inset-0 rounded'
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/pages/other/bookPattern.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.2,
          }}
        />
        <div
          className='absolute inset-0 opacity-50 rounded'
          style={{
            backgroundColor: color,
            backdropFilter: 'blur(40px)',
          }}
        />
      </div>

      {/* Content */}
      <div className='relative z-10 flex items-center flex-col gap-4'>
        {icon}
        <div className='ml-2 flex flex-col gap-1'>
          <div className='text-sm'>{name}</div>
          <div className='font-semibold text-2xl'>{nf.format(value)}</div>
        </div>
      </div>
    </div>
  );
}

StatisticCard.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.element,
  color: PropTypes.string,
};

export default StatisticCard;
