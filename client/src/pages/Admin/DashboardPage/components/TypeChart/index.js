import React from 'react';
import PropTypes from 'prop-types';
import CustomBarChart from '../CustomBarChart';

const TypeChart = ({ typeStatistics = [], }) => {
  // console.log('Types Statistics', typesStatistics);

  const categoryNames = typeStatistics.map((type) => type.name); // Extract category names
  const stockQuantities = typeStatistics.map((type) => type.stockQuantity);
  // console.log(categoryNames, stockQuantities);

  const state = {
    options: {
      chart: {
        id: 'basic-bar',
        type: 'bar',
        height: 350,
        width: '100%',
      },

      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: 'end',
          horizontal: false,
          dataLabels: {
            position: 'top',
          },
        },

      },
      xaxis: {
        categories: categoryNames,
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758',],
        },
      },
    },
    series: [
      {
        data: stockQuantities,
      },
    ],
  };
  return (
    <div>
      <CustomBarChart state={state} title={'Thống kê số lượng sách theo Thể loại sách'}></CustomBarChart>
    </div>
  );
};

TypeChart.propTypes = {
  typeStatistics: PropTypes.array,
};

export default TypeChart;
