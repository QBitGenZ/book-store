import React from 'react';
import StatisticCard from '~/pages/Admin/DashboardPage/components/StatisticCard';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faBoxArchive, } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function Order({ revenueStatistics, }) {
  const calTotalProductRevenue = () => {
    return revenueStatistics?.result.reduce((total, item) => {
      return total + item.orderCount;
    }, 0) || 0;
  };

  return (
    <>
      <StatisticCard
        name={'Đơn hàng'}
        value={calTotalProductRevenue()}
        color={'#DAD0EC'}
        icon={
          <div
            className={
              'flex items-center justify-center w-12 h-12 text-white rounded-full  bg-[#AA98FD]'
            }
          >
            <FontAwesomeIcon icon={faBoxArchive} className='w-6 h-6' />
          </div>
        }
      />
    </>
  );
}

Order.propTypes = {
  revenueStatistics: PropTypes.array,
};

export default Order;
