import React from 'react';
import CustomLineChart from '~/pages/Admin/DashboardPage/components/CustomLineChart';
import PropTypes from 'prop-types';
import { formatCurrency, } from '~/helpers';

const RevenueChart = ({ revenueStatistics = [], }) => {
  const categoryNames = revenueStatistics.map((type) => {
    // Correct zero-based month
    const correctedMonth = type._id.month - 1; // Adjust month back to zero-based
    const date = new Date(type._id.year, correctedMonth);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  });
  console.log(categoryNames);

  const revenues = revenueStatistics.map((type) => type.totalRevenue);

  const state = {
    options: {
      chart: {
        id: 'basic-line',
        type: 'line',
        height: 350,
        width: '100%',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000,
          },
        },
      },
      stroke: {
        curve: 'smooth',
        // width: 2,
      },
      labels: categoryNames,
      markers: {
        size: 6,
        shape: 'circle',
      },

      xaxis: {
        type: 'datetime',
        categories: categoryNames,
        labels: {
          format: 'MM/yyyy',
          show: true,
        },
        tickAmount: categoryNames.length,

      },
      yaxis: {
        title: {
          text: 'Doanh thu',
        },
        labels: {
          show: true,
          formatter: function(value) {
            return formatCurrency(value);
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        x: {
          format: 'MM/yyyy',
        },
        y: {
          formatter: function(value) {
            return formatCurrency(value);
          },
        },
      },
    },
    series: [
      {
        name: 'Doanh thu',
        data: revenues,
      },
    ],
  };

  return (
    <div>
      <CustomLineChart state={state} title='Thống kê doanh thu' />
    </div>
  );
};

RevenueChart.propTypes = {
  revenueStatistics: PropTypes.array,
};

export default RevenueChart;