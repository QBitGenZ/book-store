import React from 'react';
import StatisticCard from '~/pages/Admin/DashboardPage/components/StatisticCard';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faBoxesStacked, } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function Inventory({ productStatistics = [], }) {
  // console.log(Array.isArray(productStatistics)); // Should log true if it's an array

  const calTotalProductInventory = () => {
    return productStatistics.reduce((total, item) => {
      return total + item.stockQuantity;
    }, 0);
  };

  return (
    <>
      <StatisticCard
        name={'Tồn kho'}
        value={calTotalProductInventory()}
        color={'#C0E4F8'}
        icon={
          <div
            className={
              'flex items-center justify-center w-12 h-12 text-white rounded-full  bg-[#3BA3DC]'
            }
          >
            <FontAwesomeIcon icon={faBoxesStacked} className='w-6 h-6' />
          </div>
        }
      />
    </>
  );
}

Inventory.propTypes = {
  productStatistics: PropTypes.array,
};

export default Inventory;
