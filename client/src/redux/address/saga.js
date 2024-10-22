import { call, put, takeLatest, } from 'redux-saga/effects';
import { showSnackbar, } from '../snackbar/slice';
import { createAddressRequestFailure,
  createAddressRequestStart,
  createAddressRequestSuccess,
  deleteAddressRequestFailure,
  deleteAddressRequestStart,
  deleteAddressRequestSuccess,
  getAddressesRequestFailure,
  getAddressesRequestStart,
  getAddressesRequestSuccess,
  getAddressRequestFailure,
  getAddressRequestStart,
  getAddressRequestSuccess,
  updateAddressRequestFailure,
  updateAddressRequestStart,
  updateAddressRequestSuccess, } from './slice';
import { createOneApi, deleteOneApi, getAllRequestApi, getOneRequestApi, updateOneApi, } from './api';

// Handle fetching all addresses
function* handleGetAddressesRequest(action) {
  try {
    const response = yield call(getAllRequestApi, action.payload);
    const { data, meta, } = response;

    // Check if the response is valid
    if (response && response.status === 200) {
      yield put(getAddressesRequestSuccess({
        data, meta,
      }));
      yield put(showSnackbar({
        message: 'Addresses fetched successfully!',
        severity: 'success',
      }));
    } else {
      throw new Error('Failed to fetch addresses.');
    }
  } catch (err) {
    yield put(getAddressesRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch addresses: ${err.message}`,
      severity: 'error',
    }));
  }
}

// Handle fetching a single address
function* handleGetAddressRequest(action) {
  try {
    const response = yield call(getOneRequestApi, action.payload);
    const { data, } = response;

    // Check if the response is valid
    if (response && response.status === 200) {
      yield put(getAddressRequestSuccess(data));
      yield put(showSnackbar({
        message: 'Address fetched successfully!',
        severity: 'success',
      }));
    } else {
      throw new Error('Failed to fetch address.');
    }
  } catch (err) {
    yield put(getAddressRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch address: ${err.message}`,
      severity: 'error',
    }));
  }
}

// Handle creating a new address
function* handleCreateAddressRequest(action) {
  try {
    const response = yield call(createOneApi, action.payload);
    console.log(action.payload);

    yield put(createAddressRequestSuccess(response.data));
    yield put(showSnackbar({
      message: 'Address created successfully!',
      severity: 'success',
    }));
  } catch (err) {
    yield put(createAddressRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to create address: ${err.message}`,
      severity: 'error',
    }));
  }
}

// Handle updating an existing address
function* handleUpdateAddressRequest(action) {
  try {
    const response = yield call(updateOneApi, action.payload.id, action.payload.data);
    console.log(action.payload);
    yield put(updateAddressRequestSuccess(response.data));
    yield put(showSnackbar({
      message: 'Address updated successfully!',
      severity: 'success',
    }));

  } catch (err) {
    yield put(updateAddressRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to update address: ${err.message}`,
      severity: 'error',
    }));
  }
}

// Handle deleting an address
function* handleDeleteAddressRequest(action) {
  try {
    yield call(deleteOneApi, action.payload);

    yield put(deleteAddressRequestSuccess());
    yield put(showSnackbar({
      message: 'Address deleted successfully!',
      severity: 'success',
    }));

  } catch (err) {
    yield put(deleteAddressRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to delete address: ${err.message}`,
      severity: 'error',
    }));
  }
}

// Watcher saga
export default function* watchAddressActions() {
  yield takeLatest(getAddressesRequestStart.type, handleGetAddressesRequest);
  yield takeLatest(getAddressRequestStart.type, handleGetAddressRequest);
  yield takeLatest(createAddressRequestStart.type, handleCreateAddressRequest);
  yield takeLatest(updateAddressRequestStart.type, handleUpdateAddressRequest);
  yield takeLatest(deleteAddressRequestStart.type, handleDeleteAddressRequest);
}
