import { createOneRequestApi,
  getAllByAdminRequestApi,
  getAllRequestApi,
  updateOneRequestApi, } from '~/redux/order/api';

const { put, takeLatest, call, } = require('redux-saga/effects');
const { showSnackbar, } = require('../snackbar/slice');
const {
  getAllOrderRequestFailure,
  getAllOrderRequestSuccess,
  getAllOrderRequestStart,
  getAllByAdminRequestFailure,
  getAllByAdminRequestSuccess,
  getAllByAdminRequestStart,
  createOrderRequestFailure,
  createOrderRequestSuccess,
  createOrderRequestStart,
  updateOrderRequestFailure,
  updateOrderRequestSuccess,
  updateOrderRequestStart,
} = require('./slice');

function* handleGetAllOrderRequest(action) {
  try {
    const response = yield call(getAllRequestApi, action.payload);
    const { data, meta, } = response;
    yield put(
      getAllOrderRequestSuccess({
        data,
        meta,
      })
    );
    yield put(
      showSnackbar({
        message: 'Types request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getAllOrderRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Order request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetAllByAdminRequest(action) {
  try {
    const response = yield call(getAllByAdminRequestApi, action.payload);
    const { data, meta, } = response;
    yield put(
      getAllByAdminRequestSuccess({
        data,
        meta,
      })
    );
    yield put(
      showSnackbar({
        message: 'Admin order request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getAllByAdminRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Admin order request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleCreateOrderRequest(action) {
  try {
    const response = yield call(createOneRequestApi, action.payload);
    const { data, } = response;
    yield put(createOrderRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Types created successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(createOrderRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Order creation failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleUpdateOrderRequest(action) {
  try {
    const response = yield call(
      updateOneRequestApi,
      action.payload.id,
      action.payload.data
    );
    const { data, } = response;
    yield put(updateOrderRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Types updated successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(updateOrderRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Order update failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

export default function* watchOrderActions() {
  yield takeLatest(getAllOrderRequestStart.type, handleGetAllOrderRequest);
  yield takeLatest(getAllByAdminRequestStart.type, handleGetAllByAdminRequest);
  yield takeLatest(createOrderRequestStart.type, handleCreateOrderRequest);
  yield takeLatest(updateOrderRequestStart.type, handleUpdateOrderRequest);
}
