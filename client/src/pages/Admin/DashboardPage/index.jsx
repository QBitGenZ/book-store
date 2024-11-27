import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getAllStatisticsRequestStart, getRevenueStatisticsRequestStart, } from '~/redux/statistic/slice';
import Inventory from './components/Inventory';
import Revenue from './components/Revenue';
import Order from './components/Order';

// import Types from './components/Type';
import TypeChart from './components/TypeChart';
import PublisherChart from './components/PublisherChart';
import RevenueChart from '~/pages/Admin/DashboardPage/components/RevenueChart';

const DashboardPage = () => {
  const { allStatistics, revenueStatistics, } = useSelector((state) => state.statistic);
  const dispatch = useDispatch();
  const [query,] = React.useState('Month');
  React.useEffect(() => {
    dispatch(getAllStatisticsRequestStart());
    dispatch(getRevenueStatisticsRequestStart({
      query, 
    }));
    console.log(revenueStatistics);
  }, [dispatch,]);
  const render = () => (
    <>
      {allStatistics && (
        <>
          <div className={'flex flex-row gap-3 '}>
            <Inventory productStatistics={allStatistics?.productStatistics} />
            <Revenue revenueStatistics={revenueStatistics} />
            <Order revenueStatistics={revenueStatistics} />
          </div>

          {/* <Types typesStatistics={allStatistics?.typeStatistics} />*/}
          <RevenueChart revenueStatistics={revenueStatistics?.result} />
          <TypeChart typeStatistics={allStatistics?.typeStatistics}></TypeChart>
          <PublisherChart publisherStatistics={allStatistics?.publisherStatistics}></PublisherChart>
        </>
      )}
    </>
  );

  return render();
};

export default DashboardPage;
