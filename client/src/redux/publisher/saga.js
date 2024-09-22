const { put, takeLatest, call, } = require('redux-saga/effects');
const { showSnackbar, } = require('../snackbar/slice');
const {
  getPublishersRequestFailure,
  getPublishersRequestSuccess,
  getPublishersRequestStart,
  getPublishersByAdminRequestSuccess,
  getPublishersByAdminRequestFailure,
  getPublishersByAdminRequestStart,
  getPublisherRequestSuccess,
  getPublisherRequestFailure,
  getPublisherByAdminRequestSuccess,
  getPublisherByAdminRequestFailure,
  getPublisherRequestStart,
  getPublisherByAdminRequestStart,
  createPublisherByAdminRequestSuccess,
  createPublisherByAdminRequestFailure,
  createPublisherByAdminRequestStart,
  updatePublisherByAdminRequestSuccess,
  updatePublisherByAdminRequestFailure,
  updatePublisherByAdminRequestStart,
  deletePublisherByAdminRequestSuccess,
  deletePublisherByAdminRequestFailure,
  deletePublisherByAdminRequestStart,
} = require('./slice');
const {
  getAllRequestApi,
  getAllByAdminRequestApi,
  getOneRequestApi,
  getOneByAdminRequestApi,
  createOneByAdminApi,
  updateOneByAdminApi,
  deleteOneByAdminApi,
} = require('./api');

function* handleGetPublishersRequest(action) {
  try {
    const response = yield call(getAllRequestApi, action.payload);
    const { data, meta, } = response;
    yield put(
      getPublishersRequestSuccess({
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
    yield put(getPublishersRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetPublishersByAdminRequest(action) {
  try {
    const response = yield call(getAllByAdminRequestApi, action.payload);
    const { data, meta, } = response;
    yield put(
      getPublishersByAdminRequestSuccess({
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
    yield put(getPublishersByAdminRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetPublisherRequest(action) {
  try {
    const response = yield call(getOneRequestApi, action.payload);
    const { data, } = response;
    yield put(getPublisherRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getPublisherRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetPublisherByAdminRequest(action) {
  try {
    const response = yield call(getOneByAdminRequestApi, action.payload);
    const { data, } = response;
    yield put(getPublisherByAdminRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getPublisherByAdminRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleCreatePublisherByAdminRequest(action) {
  try {
    const response = yield call(createOneByAdminApi, action.payload);
    const { data, } = response;
    yield put(createPublisherByAdminRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(createPublisherByAdminRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleUpdatePublisherByAdminRequest(action) {
  try {
    const response = yield call(
      updateOneByAdminApi,
      action.payload.id,
      action.payload.data
    );
    const { data, } = response;
    yield put(updatePublisherByAdminRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(updatePublisherByAdminRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleDeletePublisherByAdminRequest(action) {
  try {
    yield call(deleteOneByAdminApi, action.payload);
    yield put(deletePublisherByAdminRequestSuccess());
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(deletePublisherByAdminRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

export default function* watchPublisherActions() {
  yield takeLatest(getPublishersRequestStart.type, handleGetPublishersRequest);
  yield takeLatest(
    getPublishersByAdminRequestStart.type,
    handleGetPublishersByAdminRequest
  );
  yield takeLatest(getPublisherRequestStart.type, handleGetPublisherRequest);
  yield takeLatest(
    getPublisherByAdminRequestStart.type,
    handleGetPublisherByAdminRequest
  );
  yield takeLatest(
    createPublisherByAdminRequestStart.type,
    handleCreatePublisherByAdminRequest
  );
  yield takeLatest(
    updatePublisherByAdminRequestStart.type,
    handleUpdatePublisherByAdminRequest
  );
  yield takeLatest(
    deletePublisherByAdminRequestStart.type,
    handleDeletePublisherByAdminRequest
  );
}
