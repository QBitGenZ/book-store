const { put, takeLatest, call, } = require('redux-saga/effects');
import { showSnackbar, } from '../snackbar/slice';
import { createDonationRequestFailure,
  createDonationRequestStart,
  createDonationRequestSuccess,
  deleteDonationRequestFailure,
  deleteDonationRequestStart,
  deleteDonationRequestSuccess,
  getDonationRequestFailure,
  getDonationRequestStart,
  getDonationRequestSuccess,
  getDonationsRequestFailure,
  getDonationsRequestStart,
  getDonationsRequestSuccess, } from './slice';
import { createDonationApi,
  deleteDonationApi,
  getAllDonationsApi,
  getOneDonationApi, } from './api';

function* handleGetDonationsRequest(action) {
  try {
    const response = yield call(getAllDonationsApi, action.payload);
    const { data, meta, } = response;
    yield put(
      getDonationsRequestSuccess({
        data,
        meta,
      })
    );
    yield put(
      showSnackbar({
        message: 'Request successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getDonationsRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failure: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetDonationRequest(action) {
  try {
    const response = yield call(getOneDonationApi, action.payload);
    const { data, } = response;
    console.log(data);
    yield put(getDonationRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getDonationRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failure: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleCreateDonationRequest(action) {
  try {
    const response = yield call(createDonationApi, action.payload);
    const { data, } = response;
    yield put(createDonationRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(createDonationRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failure: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleDeleteDonationRequest(action) {
  try {
    yield call(deleteDonationApi, action.payload);
    yield put(deleteDonationRequestSuccess());
    yield put(
      showSnackbar({
        message: 'Request successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(deleteDonationRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failure: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

export default function* watchDonationsActions() {
  yield takeLatest(getDonationsRequestStart.type, handleGetDonationsRequest);
  yield takeLatest(getDonationRequestStart.type, handleGetDonationRequest);
  yield takeLatest(
    createDonationRequestStart.type,
    handleCreateDonationRequest
  );
  yield takeLatest(
    deleteDonationRequestStart.type,
    handleDeleteDonationRequest
  );
}
