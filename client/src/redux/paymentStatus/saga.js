const { put, takeLatest, call, } = require('redux-saga/effects');
const { showSnackbar, } = require('../snackbar/slice');
const {
  getPaymentStatusesRequestSuccess,
  getPaymentStatusesRequestFailure,
  getPaymentStatusRequestSuccess,
  getPaymentStatusRequestFailure,
  createPaymentStatusRequestFailure,
  createPaymentStatusRequestSuccess,
  updatePaymentStatusRequestSuccess,
  updatePaymentStatusRequestFailure,
  deletePaymentStatusRequestSuccess,
  deletePaymentStatusRequestFailure,
  getPaymentStatusesRequestStart,
  getPaymentStatusRequestStart,
  createPaymentStatusRequestStart,
  updatePaymentStatusRequestStart,
  deletePaymentStatusRequestStart,
} = require('./slice');
const {
  getAllRequestApi,
  getOneRequestApi,
  createOneRequestApi,
  updateOneRequestApi,
  deleteOneRequestApi,
} = require('./api');

function* handleGetPaymentStatusesRequest(action) {
  try {
    const response = yield call(getAllRequestApi, action.payload);
    const { data, meta, } = response;
    yield put(
      getPaymentStatusesRequestSuccess({
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
    yield put(getPaymentStatusesRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetPaymentStatusRequest(action) {
  try {
    const response = yield call(getOneRequestApi, action.payload);
    const { data, } = response;
    yield put(getPaymentStatusRequestSuccess(data));
    // yield put(
    //   showSnackbar({
    //     message: 'Request successful!',
    //     severity: 'success',
    //   })
    // );
  } catch (err) {
    yield put(getPaymentStatusRequestFailure(err.message));
    // yield put(
    //   showSnackbar({
    //     message: `Request failed: ${err.message}`,
    //     severity: 'error',
    //   })
    // );
  }
}

function* handleCreatePaymentStatusRequest(action) {
  try {
    const response = yield call(createOneRequestApi, action.payload);
    const { data, } = response;
    yield put(createPaymentStatusRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(createPaymentStatusRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleUpdatePaymentStatusRequest(action) {
  try {
    const response = yield call(
      updateOneRequestApi,
      action.payload.id,
      action.payload.data
    );
    const { data, } = response;
    yield put(updatePaymentStatusRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(updatePaymentStatusRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleDeletePaymentStatusRequest(action) {
  try {
    yield call(deleteOneRequestApi, action.payload);
    yield put(deletePaymentStatusRequestSuccess());
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(deletePaymentStatusRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

export default function* watchPaymentStatusActions() {
  yield takeLatest(
    getPaymentStatusesRequestStart.type,
    handleGetPaymentStatusesRequest
  );
  yield takeLatest(
    getPaymentStatusRequestStart.type,
    handleGetPaymentStatusRequest
  );
  yield takeLatest(
    createPaymentStatusRequestStart.type,
    handleCreatePaymentStatusRequest
  );
  yield takeLatest(
    updatePaymentStatusRequestStart.type,
    handleUpdatePaymentStatusRequest
  );
  yield takeLatest(
    deletePaymentStatusRequestStart.type,
    handleDeletePaymentStatusRequest
  );
}
