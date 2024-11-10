import React from 'react';
import StatisticCard from '~/pages/Admin/DashboardPage/components/StatisticCard';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faBoxesStacked, } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function Revenue({ productStatistics, }) {
  const calTotalProductRevenue = () => {
    return productStatistics.reduce((total, item) => {
      return total + item.revenue;
    }, 0);
  };

  return (
    <>
      <StatisticCard
        name={'Doanh thu'}
        value={calTotalProductRevenue()}
        color={'#D7EECC'}
        icon={
          <div
            className={
              'flex items-center justify-center w-12 h-12 text-white rounded-full  bg-[#51C952]'
            }
          >
            <FontAwesomeIcon icon={faBoxesStacked} className='w-6 h-6' />
          </div>
        }
      />
    </>
  );
}

Revenue.propTypes = {
  productStatistics: PropTypes.array,
};

export default Revenue;
