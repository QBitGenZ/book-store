import ReactApexChart from 'react-apexcharts';
import React from 'react';
import PropTypes from 'prop-types';

function CustomLineChart({ state, title, }) {
  return (
    <div className={'mx-12 mt-12 text-left'}>
      <span className={'text-left font-bold text-xl'}>{title}</span>
      <div className={'mt-2'}>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type={state.options.chart.type}
          width='100%'
          height={'400'}
        >

        </ReactApexChart></div>
    </div>
  
  )
  ;
}

CustomLineChart.propTypes = {
  state: PropTypes.object.isRequired,
  title: PropTypes.string,
};
export default CustomLineChart;

