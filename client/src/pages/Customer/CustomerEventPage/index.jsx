import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { getAllEventsRequestStart, } from '~/redux/event/slice';
import { CustomerPagination, } from '~/components';
import EventCard from 'src/pages/Customer/CustomerEventPage/components/EventCard';
import { useNavigate, } from 'react-router-dom';
import { clientRoutes, } from '~/configs/routes';
import CurrentEvent from '~/pages/Customer/CustomerEventPage/components/CurrentEvent';

const CustomerEventPage = () => {
  const dispatch = useDispatch();
  const { events, meta, } = useSelector((state) => state.event);
  const [orderBy,] = React.useState('');
  const [descending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit,] = React.useState(3);
  const nav = useNavigate();
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

  const handleDetail = (e) => {
    nav(clientRoutes.eventDetail.replace(e._id, ':id'), {
      state: e,
    });
  };

  const render = () => (
    <>
      <div className={'mx-[-136px] mt-[-24px] mb-4'}>
        <img
          className='w-full object-cover rounded'
          src={`${process.env.PUBLIC_URL}/assets/pages/other/eventBanner.png`}
        />
      </div>
      <div className={'mx-[-136px] mt-[-24px] bg-gradient-to-r from-[#F9F9F9] to-[#EAF5FA]'}>
        <div className={'mx-[136px] mt-[24px] grid grid-cols-3 gap-3'}>

          {events.map((event) => (
            <div key={event._id} onClick={() => handleDetail(event)}>
              <EventCard event={event}/>
            </div>
          ))}
        </div>

        <CustomerPagination
          currentPage={meta?.page ?? 1}
          totalPages={meta?.totalPage ?? 1}
          onPageChange={setPage}
        />
      </div>
      <div onClick={() => handleDetail(events[0])}>
        <CurrentEvent event={events[0]}/>
      </div>
    </>
  );
  return <>{events ? render() : <div>Không có sự kiện</div>}</>;
};

export default CustomerEventPage;
