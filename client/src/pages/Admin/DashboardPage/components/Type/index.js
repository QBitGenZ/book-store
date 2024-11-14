import React from 'react';
import PropTypes from 'prop-types';
// import BarChart from '@mui/x-charts';
import { BarChart, } from '@mui/x-charts';

const Types = ({ typesStatistics = [], }) => {
  console.log('Types Statistics', typesStatistics);

  const categoryNames = typesStatistics.map((type) => type.name); // Extract category names
  const stockQuantities = typesStatistics.map((type) => type.stockQuantity);
  console.log(categoryNames, stockQuantities);
  return (
    <div>
      <BarChart
        xAxis={[
          {
            scaleType: 'band',
            data: categoryNames,
          },
        ]}
        series={[
          {
            data: stockQuantities,
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
};

Types.propTypes = {
  typesStatistics: PropTypes.array,
};

export default Types;
