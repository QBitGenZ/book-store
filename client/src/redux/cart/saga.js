import { createCartRequestFailure,
  createCartRequestStart,
  createCartRequestSuccess,
  deleteAllCartRequestFailure,
  deleteAllCartRequestStart,
  deleteAllCartRequestSuccess,
  deleteCartRequestFailure,
  deleteCartRequestStart,
  deleteCartRequestSuccess,
  getCartRequestFailure,
  getCartRequestStart,
  getCartRequestSuccess,
  updateCartRequestFailure,
  updateCartRequestStart,
  updateCartRequestSuccess, } from '~/redux/cart/slice';
import { showSnackbar, } from '~/redux/snackbar/slice';
import { createOneAPi, deleteAllApi, deleteOneApi, getAllRequestApi, updateOneApi, } from '~/redux/cart/api';

const { put, takeLatest, call, } = require('redux-saga/effects');

function* handleCartRequest(action) {
  try {
    const response = yield call(getAllRequestApi, action.payload);
    const { data, meta, } = response;
    
    yield put(getCartRequestSuccess({
      data, meta,
    }));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success',
    }));

  } catch (err) {
    yield put(getCartRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error',
    }));
  }
}

function* handleCreateCartRequest(action) {
  try {
    const response = yield call(createOneAPi, action.payload);
    const { data, } = response;
    yield put(createCartRequestSuccess(data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success',
    }));
  } catch (err) {
    yield put(createCartRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error',
    }));
  }
}

function* handleUpdateCartRequest(action) {
  try {
    const response = yield call(updateOneApi, action.payload);
    const { data, } = response;
    yield put(updateCartRequestSuccess(data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success',
    }));
  } catch (err) {
    yield put(updateCartRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error',
    }));
  }
}

function* handleDeleteCartItemRequest(action) {
  try {
    const response = yield call(deleteOneApi, action.payload);
    const { data, } = response;
    yield put(deleteCartRequestSuccess(data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success',
    }));
  } catch (err) {
    yield put(deleteCartRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error',
    }));
  }
}

function* handleDeleteAllCartRequest(action) {
  try {
    yield call(deleteAllApi, action.payload);
    yield put(deleteAllCartRequestSuccess());
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success',
    }));
  } catch (err) {
    yield put(deleteAllCartRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error',
    }));
  }
}

export default function* watchCartActions() {
  yield takeLatest(getCartRequestStart.type, handleCartRequest);
  yield takeLatest(createCartRequestStart.type, handleCreateCartRequest);
  yield takeLatest(updateCartRequestStart.type, handleUpdateCartRequest);
  yield takeLatest(deleteCartRequestStart.type, handleDeleteCartItemRequest);
  yield takeLatest(deleteAllCartRequestStart.type, handleDeleteAllCartRequest);
}