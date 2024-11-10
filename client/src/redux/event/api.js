import { apiFetch, } from '~/helpers';

const getAllEventsApi = (query) => {
  return apiFetch({
    url: 'events',
    queryParams: query,
  });
};

const getAllEventsByAdminApi = (query) => {
  return apiFetch({
    url: 'events/admin',
    queryParams: query,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

const getEventByIdApi = (id) => {
  return apiFetch({
    url: `events/${id}`,
  });
};

const getEventByAdminApi = (id) => {
  return apiFetch({
    url: `events/admin/${id}`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

const createEventApi = (event) => {
  return apiFetch({
    url: 'events/admin',
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: event,
    },
  });
};

const updateEventApi = (id, event) => {
  return apiFetch({
    url: `events/admin/${id}`,
    options: {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: event,
    },
  });
};

const deleteEventApi = (id) => {
  return apiFetch({
    url: `events/admin/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

const donateBookApi = (eventId, donation) => {
  return apiFetch({
    url: `events/${eventId}/donate`,
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: donation,
    },
  });
};

const updateDonationStatusApi = (eventId, donationId, body) => {
  return apiFetch({
    url: `events/admin/${eventId}/donations/${donationId}/status`,
    options: {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: body,
    },
  });
};

const getEventStatisticsApi = (id) => {
  return apiFetch({
    url: `events/${id}/statistics`,
    options: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });
};

export {
  getAllEventsApi,
  getAllEventsByAdminApi,
  getEventByIdApi,
  getEventByAdminApi,
  createEventApi,
  updateEventApi,
  deleteEventApi,
  donateBookApi,
  updateDonationStatusApi,
  getEventStatisticsApi,
};
