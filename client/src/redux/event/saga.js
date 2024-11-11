import { createEventApi,
  deleteEventApi,
  donateBookApi,
  getAllEventsApi,
  getAllEventsByAdminApi,
  getEventStatisticsApi,
  updateDonationStatusApi,
  updateEventApi, } from './api';

import { call, put, takeLatest, } from 'redux-saga/effects';
import { showSnackbar, } from '../snackbar/slice';
import { createEventRequestFailure,
  createEventRequestStart,
  createEventRequestSuccess,
  deleteEventRequestFailure,
  deleteEventRequestStart,
  deleteEventRequestSuccess,
  donateBookRequestFailure,
  donateBookRequestStart,
  donateBookRequestSuccess,
  getAllEventsByAdminRequestFailure,
  getAllEventsByAdminRequestStart,
  getAllEventsByAdminRequestSuccess,
  getAllEventsRequestFailure,
  getAllEventsRequestStart,
  getAllEventsRequestSuccess,
  getEventStatisticsRequestFailure,
  getEventStatisticsRequestStart,
  getEventStatisticsRequestSuccess,
  updateDonationStatusRequestFailure,
  updateDonationStatusRequestStart,
  updateDonationStatusRequestSuccess,
  updateEventRequestFailure,
  updateEventRequestStart,
  updateEventRequestSuccess, } from './slice';

function* handleGetAllEventsRequest(action) {
  try {
    const response = yield call(getAllEventsApi, action.payload);
    const { data, meta, } = response;
    yield put(
      getAllEventsRequestSuccess({
        data,
        meta,
      })
    );
    yield put(
      showSnackbar({
        message: 'Events fetched successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getAllEventsRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Failed to fetch events: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetAllEventsByAdminRequest(action) {
  try {
    const response = yield call(getAllEventsByAdminApi, action.payload);
    const { data, meta, } = response;
    yield put(
      getAllEventsByAdminRequestSuccess({
        data,
        meta,
      })
    );
    yield put(
      showSnackbar({
        message: 'Admin events fetched successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getAllEventsByAdminRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Admin events fetch failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleCreateEventRequest(action) {
  try {
    const response = yield call(createEventApi, action.payload);
    const { data, } = response;
    yield put(createEventRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Event created successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(createEventRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Event creation failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleUpdateEventRequest(action) {
  try {
    const response = yield call(
      updateEventApi,
      action.payload.id,
      action.payload.data
    );
    const { data, } = response;
    yield put(updateEventRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Event updated successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(updateEventRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Event update failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleDeleteEventRequest(action) {
  try {
    yield call(deleteEventApi, action.payload);
    yield put(deleteEventRequestSuccess());
    yield put(
      showSnackbar({
        message: 'Event deleted successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(deleteEventRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Event deletion failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleDonateBookRequest(action) {
  try {
    const response = yield call(
      donateBookApi,
      action.payload.eventId,
      action.payload.donation
    );
    const { data, } = response;
    yield put(donateBookRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Donation successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(donateBookRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Donation failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleUpdateDonationStatusRequest(action) {
  try {
    const response = yield call(
      updateDonationStatusApi,
      action.payload.eventId,
      action.payload.donationId,
      action.payload.body
    );
    const { data, } = response;
    yield put(updateDonationStatusRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Donation status updated successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(updateDonationStatusRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Donation status update failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetEventStatisticsRequest(action) {
  try {
    const response = yield call(getEventStatisticsApi, action.payload);
    const { data, } = response;
    yield put(getEventStatisticsRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Event statistic fetched successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getEventStatisticsRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Failed to fetch event statistics: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

export default function* watchEventActions() {
  yield takeLatest(getAllEventsRequestStart.type, handleGetAllEventsRequest);
  yield takeLatest(
    getAllEventsByAdminRequestStart.type,
    handleGetAllEventsByAdminRequest
  );
  yield takeLatest(createEventRequestStart.type, handleCreateEventRequest);
  yield takeLatest(updateEventRequestStart.type, handleUpdateEventRequest);
  yield takeLatest(deleteEventRequestStart.type, handleDeleteEventRequest);
  yield takeLatest(donateBookRequestStart.type, handleDonateBookRequest);
  yield takeLatest(
    updateDonationStatusRequestStart.type,
    handleUpdateDonationStatusRequest
  );
  yield takeLatest(
    getEventStatisticsRequestStart.type,
    handleGetEventStatisticsRequest
  );
}
