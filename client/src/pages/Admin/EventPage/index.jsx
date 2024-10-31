// EventPage.jsx
import React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { ConfirmationModal, DataTable, Pagination, } from '~/components';
import { formatDate, translate, } from '~/helpers';
import { createEventRequestStart,
  deleteEventRequestStart,
  getAllEventsRequestStart,
  updateEventRequestStart, } from '~/redux/event/slice';
import CreateEventModal from './components/CreateEventModal';
import UpdateEventModal from './components/UpdateEventModal';
import { Button, } from '@mui/material';

const EventPage = () => {
  const dispatch = useDispatch();
  const { events, meta, event, updateSuccess, deleteSuccess, createSuccess, } = useSelector(state => state.event);

  const [orderBy, setOrderBy,] = React.useState('');
  const [descending, setDescending,] = React.useState(true);
  const [page, setPage,] = React.useState(1);
  const [limit, setLimit,] = React.useState(5);
  const [selectedObj, setSelectedObj,] = React.useState(null);

  const [showCreateEvent, setShowCreateEvent,] = React.useState(false);
  const [showUpdateEvent, setShowUpdateEvent,] = React.useState(false);
  const [showConfirm, setShowConfirm,] = React.useState(false);
  const [confirmAction, setConfirmAction,] = React.useState(() => () => {
  });
  const [confirmMessage, setConfirmMessage,] = React.useState('');

  const getEvents = () => {
    dispatch(getAllEventsRequestStart({
      orderBy,
      page,
      limit,
      descending,
    }));
  };

  React.useEffect(() => {
    if (!events || events.length === 0 || events.length !== limit) {
      getEvents();
    }
  }, [orderBy, descending, page, limit, dispatch, event, selectedObj, updateSuccess, deleteSuccess, createSuccess,]);

  const updateEvent = (id, eventData) => {
    const data = {
      title: eventData?.title,
      description: eventData?.description,
      startDate: eventData?.startDate,
      endDate: eventData?.endDate,
    };

    dispatch(updateEventRequestStart({
      id: id,
      data: JSON.stringify(data),
    }));
  };

  const handleUpdateEvent = (value) => {
    const selectedCopy = {
      ...value,
    };
    setSelectedObj(selectedCopy);
    setShowUpdateEvent(true);
  };

  const createEvent = ({ title, description, startDate, endDate, }) => {
    const data = {
      title,
      description,
      startDate,
      endDate,
    };

    dispatch(createEventRequestStart(JSON.stringify(data)));
    setShowCreateEvent(false);
  };

  const confirmUpdateEvent = (id, eventData) => {
    setConfirmAction(() => () => {
      updateEvent(id, eventData);
      setShowConfirm(false);
      setShowUpdateEvent(false);
    });
    setConfirmMessage('Are you sure you want to save these changes?');
    setShowConfirm(true);
  };

  const handleDeleteEvent = (value) => {
    setConfirmAction(() => () => {
      dispatch(deleteEventRequestStart(value?.id));
      setSelectedObj(null);
      setShowConfirm(false);
    });
    setConfirmMessage('Are you sure you want to delete this item?');
    setShowConfirm(true);
  };

  const render = () => (
    <>
      <ConfirmationModal
        body={confirmMessage}
        onConfirm={confirmAction}
        onHide={() => setShowConfirm(false)}
        title='Confirmation'
        show={showConfirm}
      />
      <CreateEventModal setShow={setShowCreateEvent} show={showCreateEvent} createEvent={createEvent}/>
      <UpdateEventModal setShow={setShowUpdateEvent} show={showUpdateEvent} updateEvent={confirmUpdateEvent}
        event={selectedObj}/>
      <div className='flex flex-col'>
        <div className='leading-10 text-left py-2 mb-3 bg-gray-50 text-2xl'>{translate('events')}</div>
        <div className='flex flex-row w-full justify-between gap-3'>
          <div className='rounded-xl p-3 bg-white w-full'>
            <div className='text-right mb-3'>
              <Button onClick={() => setShowCreateEvent(true)}
                variant='contained'>{translate('create')}</Button>
            </div>
            <DataTable
              actions={[
                {
                  label: translate('update'),
                  handler: handleUpdateEvent,
                },
                {
                  label: translate('delete'),
                  handler: handleDeleteEvent,
                },
              ]}
              columns={[
                {
                  field: 'id',
                  enableSort: false,
                  label: translate('#'),
                },
                {
                  field: 'title',
                  enableSort: true,
                  label: translate('title'),
                },
                {
                  field: 'description',
                  enableSort: false,
                  label: translate('description'),
                },
                {
                  field: 'startDate',
                  enableSort: true,
                  label: translate('start-date'),
                },
                {
                  field: 'endDate',
                  enableSort: true,
                  label: translate('end-date'),
                },
              ]} data={events?.map(item => ({
                ...item,
                id: item._id,
                startDate: formatDate(item.startDate),
                endDate: formatDate(item.endDate),

              }))} keyField='_id' onSort={(f, des) => {
                setOrderBy(f);
                setDescending(des === 'desc');
              }}/>

            <Pagination count={meta?.totalPage} page={page} rowsPerPage={limit} setPage={setPage}
              setRowsPerPage={setLimit}/>
          </div>

        </div>
      </div>
    </>

  );

  return render();
};

export default EventPage;