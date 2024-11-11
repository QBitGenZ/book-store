import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, } from '@mui/x-charts';

const Types = ({ typesStatistics = [], }) => {
  console.log('Types Statistics', typesStatistics);

  const categoryNames = typesStatistics.map((type) => type.name); // Extract category names
  const stockQuantities = typesStatistics.map((type) => type.stockQuantity);
  console.log(categoryNames, stockQuantities);
  return (
    <div>
      {/* <BarChart*/}
      {/*  series={[{*/}
      {/*    stockQuantities,*/}
      {/*  },]}*/}
      {/*  xAxis={[{*/}
      {/*    scaleType: 'band', data: categoryNames,*/}
      {/*  },]}*/}
      {/*  width={500}*/}
      {/*  height={300}></BarChart>*/}
      <BarChart
        xAxis={[
          {
            scaleType: 'band',
            data: ['group A', 'group B', 'group C',],
          },
        ]}
        series={[
          {
            data: [4, 3, 5,],
          },
          {
            data: [1, 6, 3,],
          },
          {
            data: [2, 5, 6,],
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
