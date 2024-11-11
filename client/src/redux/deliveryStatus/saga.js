const { put, takeLatest, call, } = require('redux-saga/effects');
const { showSnackbar, } = require('../snackbar/slice');
const {
  getDeliveryStatusesRequestSuccess,
  getDeliveryStatusesRequestFailure,
  getDeliveryStatusRequestSuccess,
  getDeliveryStatusRequestFailure,
  createDeliveryStatusRequestFailure,
  createDeliveryStatusRequestSuccess,
  updateDeliveryStatusRequestSuccess,
  updateDeliveryStatusRequestFailure,
  deleteDeliveryStatusRequestSuccess,
  deleteDeliveryStatusRequestFailure,
  getDeliveryStatusesRequestStart,
  getDeliveryStatusRequestStart,
  createDeliveryStatusRequestStart,
  updateDeliveryStatusRequestStart,
  deleteDeliveryStatusRequestStart,
} = require('./slice');
const {
  getAllRequestApi,
  getOneRequestApi,
  createOneRequestApi,
  updateOneRequestApi,
  deleteOneRequestApi,
} = require('./api');

function* handleGetDeliveryStatusesRequest(action) {
  try {
    const response = yield call(getAllRequestApi, action.payload);
    const { data, meta, } = response;
    yield put(
      getDeliveryStatusesRequestSuccess({
        data,
        meta,
      })
    );
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getDeliveryStatusesRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetDeliveryStatusRequest(action) {
  try {
    const response = yield call(getOneRequestApi, action.payload);
    const { data, } = response;
    yield put(getDeliveryStatusRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getDeliveryStatusRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleCreateDeliveryStatusRequest(action) {
  try {
    const response = yield call(createOneRequestApi, action.payload);
    const { data, } = response;
    yield put(createDeliveryStatusRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(createDeliveryStatusRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleUpdateDeliveryStatusRequest(action) {
  try {
    const response = yield call(
      updateOneRequestApi,
      action.payload.id,
      action.payload.data
    );
    const { data, } = response;
    yield put(updateDeliveryStatusRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(updateDeliveryStatusRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleDeleteDeliveryStatusRequest(action) {
  try {
    yield call(deleteOneRequestApi, action.payload);
    yield put(deleteDeliveryStatusRequestSuccess());
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(deleteDeliveryStatusRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

export default function* watchDeliveryStatusActions() {
  yield takeLatest(
    getDeliveryStatusesRequestStart.type,
    handleGetDeliveryStatusesRequest
  );
  yield takeLatest(
    getDeliveryStatusRequestStart.type,
    handleGetDeliveryStatusRequest
  );
  yield takeLatest(
    createDeliveryStatusRequestStart.type,
    handleCreateDeliveryStatusRequest
  );
  yield takeLatest(
    updateDeliveryStatusRequestStart.type,
    handleUpdateDeliveryStatusRequest
  );
  yield takeLatest(
    deleteDeliveryStatusRequestStart.type,
    handleDeleteDeliveryStatusRequest
  );
}
