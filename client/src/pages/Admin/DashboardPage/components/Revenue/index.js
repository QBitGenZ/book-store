import React from 'react';
import StatisticCard from '~/pages/Admin/DashboardPage/components/StatisticCard';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faMoneyBillTrendUp, } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function Revenue({ revenueStatistics, }) {
  const calTotalProductRevenue = () => {
    return revenueStatistics?.result.reduce((total, item) => {
      return total + item.totalRevenue;
    }, 0) || 0;
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
            <FontAwesomeIcon icon={faMoneyBillTrendUp} className='w-6 h-6' />
          </div>
        }
      />
    </>
  );
}

Revenue.propTypes = {
  revenueStatistics: PropTypes.array,
};

export default Revenue;
