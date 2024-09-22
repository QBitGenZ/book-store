const { put, takeLatest, call, } = require('redux-saga/effects');
const { showSnackbar, } = require('../snackbar/slice');
const {
  getPaymentMethodsRequestSuccess,
  getPaymentMethodsRequestFailure,
  getPaymentMethodRequestSuccess,
  getPaymentMethodRequestFailure,
  createPaymentMethodRequestFailure,
  createPaymentMethodRequestSuccess,
  updatePaymentMethodRequestSuccess,
  updatePaymentMethodRequestFailure,
  deletePaymentMethodRequestSuccess,
  deletePaymentMethodRequestFailure,
  getPaymentMethodsRequestStart,
  getPaymentMethodRequestStart,
  createPaymentMethodRequestStart,
  updatePaymentMethodRequestStart,
  deletePaymentMethodRequestStart,
} = require('./slice');
const {
  getAllRequestApi,
  getOneRequestApi,
  createOneRequestApi,
  updateOneRequestApi,
  deleteOneRequestApi,
} = require('./api');

function* handleGetPaymentMethodsRequest(action) {
  try {
    const response = yield call(getAllRequestApi, action.payload);
    const { data, meta, } = response;
    yield put(
      getPaymentMethodsRequestSuccess({
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
    yield put(getPaymentMethodsRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetPaymentMethodRequest(action) {
  try {
    const response = yield call(getOneRequestApi, action.payload);
    const { data, } = response;
    yield put(getPaymentMethodRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getPaymentMethodRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleCreatePaymentMethodRequest(action) {
  try {
    const response = yield call(createOneRequestApi, action.payload);
    const { data, } = response;
    yield put(createPaymentMethodRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(createPaymentMethodRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handlePaymentDeliveryMethodRequest(action) {
  try {
    const response = yield call(
      updateOneRequestApi,
      action.payload.id,
      action.payload.data
    );
    const { data, } = response;
    yield put(updatePaymentMethodRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(updatePaymentMethodRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleDeletePaymentMethodRequest(action) {
  try {
    yield call(deleteOneRequestApi, action.payload);
    yield put(deletePaymentMethodRequestSuccess());
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(deletePaymentMethodRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

export default function* watchDeliveryMethodActions() {
  yield takeLatest(
    getPaymentMethodsRequestStart.type,
    handleGetPaymentMethodsRequest
  );
  yield takeLatest(
    getPaymentMethodRequestStart.type,
    handleGetPaymentMethodRequest
  );
  yield takeLatest(
    createPaymentMethodRequestStart.type,
    handleCreatePaymentMethodRequest
  );
  yield takeLatest(
    updatePaymentMethodRequestStart.type,
    handlePaymentDeliveryMethodRequest
  );
  yield takeLatest(
    deletePaymentMethodRequestStart.type,
    handleDeletePaymentMethodRequest
  );
}
