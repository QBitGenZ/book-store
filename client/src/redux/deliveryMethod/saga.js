const { put, takeLatest, call, } = require('redux-saga/effects');
const { showSnackbar, } = require('../snackbar/slice');
const { getDeliveryMethodsRequestSuccess, getDeliveryMethodsRequestFailure, getDeliveryMethodRequestSuccess, getDeliveryMethodRequestFailure, createDeliveryMethodRequestFailure, createDeliveryMethodRequestSuccess, updateDeliveryMethodRequestSuccess, updateDeliveryMethodRequestFailure, deleteDeliveryMethodRequestSuccess, deleteDeliveryMethodRequestFailure, getDeliveryMethodsRequestStart, getDeliveryMethodRequestStart, createDeliveryMethodRequestStart, updateDeliveryMethodRequestStart, deleteDeliveryMethodRequestStart, } = require('./slice');
const { getAllRequestApi, getOneRequestApi, createOneRequestApi, updateOneRequestApi, deleteOneRequestApi, } = require('./api');

function* handleGetDeliveryMethodsRequest(action) {
  try {
    const response = yield call(getAllRequestApi, action.payload);
    const { data, meta, } = response;
    yield put(
      getDeliveryMethodsRequestSuccess({
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
    yield put(getDeliveryMethodsRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetDeliveryMethodRequest(action) {
  try {
    const response = yield call(getOneRequestApi, action.payload);
    const { data, } = response;
    yield put(getDeliveryMethodRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getDeliveryMethodRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleCreateDeliveryMethodRequest(action) {
  try {
    const response = yield call(createOneRequestApi, action.payload);
    const { data, } = response;
    yield put(createDeliveryMethodRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(createDeliveryMethodRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleUpdateDeliveryMethodRequest(action) {
  try {
    const response = yield call(
      updateOneRequestApi,
      action.payload.id,
      action.payload.data
    );
    const { data, } = response;
    yield put(updateDeliveryMethodRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(updateDeliveryMethodRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleDeleteDeliveryMethodRequest(action) {
  try {
    yield call(deleteOneRequestApi, action.payload);
    yield put(deleteDeliveryMethodRequestSuccess());
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(deleteDeliveryMethodRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

export default function* watchDeliveryMethodActions() {
  yield takeLatest(getDeliveryMethodsRequestStart.type, handleGetDeliveryMethodsRequest);
  yield takeLatest(getDeliveryMethodRequestStart.type, handleGetDeliveryMethodRequest);
  yield takeLatest(createDeliveryMethodRequestStart.type, handleCreateDeliveryMethodRequest);
  yield takeLatest(updateDeliveryMethodRequestStart.type, handleUpdateDeliveryMethodRequest);
  yield takeLatest(deleteDeliveryMethodRequestStart.type, handleDeleteDeliveryMethodRequest);
}
