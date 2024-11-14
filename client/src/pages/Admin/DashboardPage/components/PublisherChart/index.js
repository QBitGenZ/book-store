import React from 'react';
import PropTypes from 'prop-types';
import CustomBarChart from '../CustomBarChart';

const PublisherChart = ({ publisherStatistics = [], }) => {
  // console.log('Types Statistics', publishersStatistics);

  const xaxis = publisherStatistics.map((type) => type.name); // Extract category names
  const quantities = publisherStatistics.map((type) => type.stockQuantity);
  // console.log(zaxis, );

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
        categories: xaxis,
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
        data: quantities,
      },
    ],
  };
  return (
    <div>
      <CustomBarChart state={state} title={'Thống kê số lượng sách theo Nhà xuất bản'}></CustomBarChart>
    </div>
  );
};

PublisherChart.propTypes = {
  publisherStatistics: PropTypes.array,
};

export default PublisherChart;
