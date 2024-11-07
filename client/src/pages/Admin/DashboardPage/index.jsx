import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getAllStatisticsRequestStart, } from '~/redux/statistic/slice';
import Inventory from './components/Inventory';
import Revenue from './components/Revenue';

const DashboardPage = () => {
  const { allStatistics, } = useSelector(state => state.statistic);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllStatisticsRequestStart());
  }, [dispatch,]
  );
  const render = () => (
    <>
      {allStatistics && (
        <>
          <div className={'flex flex-row gap-3 '}>
            <Inventory productStatistics={allStatistics?.productStatistics}/>
            <Revenue productStatistics={allStatistics?.productStatistics}/>
            <Inventory productStatistics={allStatistics?.productStatistics}/>

          </div>

          {/* <Types typesStatistics={allStatistics?.typeStatistics}/>*/}
        </>

      )}

    </>
  );

  return render();
};

export default DashboardPage;