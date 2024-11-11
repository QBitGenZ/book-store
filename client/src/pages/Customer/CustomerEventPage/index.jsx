import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getAllEventsRequestStart, } from '~/redux/event/slice';
import { CustomerPagination, } from '~/components';
import EventCard from '~/pages/Customer/CustomerEventPage/EventCard';

const CustomerEventPage = () => {
  const dispatch = useDispatch();
  const { events, meta, } = useSelector((state) => state.event);
  const [orderBy,] = React.useState('');
  const [descending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit,] = React.useState(5);
  const getEvents = () => {
    dispatch(
      getAllEventsRequestStart({
        orderBy,
        page,
        limit,
        descending,
      })
    );
  };

  React.useEffect(() => {
    getEvents();
  }, [orderBy, descending, page, limit, dispatch,]);

  const render = () => (
    <>
      <div className={'bg-white rounded shadow-sm p-4'}>
        {events.map((event) => (
          <div key={event._id}>
            <EventCard event={event} />
          </div>
        ))}
      </div>

      <CustomerPagination
        currentPage={meta?.page ?? 1}
        totalPages={meta?.totalPage ?? 1}
        onPageChange={setPage}
      />
    </>
  );
  return <>{events ? render() : <div>Không có sự kiện</div>}</>;
};

export default CustomerEventPage;
