const { put, takeLatest, call, } = require('redux-saga/effects');
const { showSnackbar, } = require('../snackbar/slice');
const {
  getAuthorsRequestFailure,
  getAuthorsRequestSuccess,
  getAuthorsRequestStart,
  getAuthorsByAdminRequestSuccess,
  getAuthorsByAdminRequestFailure,
  getAuthorsByAdminRequestStart,
  getAuthorRequestSuccess,
  getAuthorRequestFailure,
  getAuthorByAdminRequestSuccess,
  getAuthorByAdminRequestFailure,
  getAuthorRequestStart,
  getAuthorByAdminRequestStart,
  createAuthorByAdminRequestSuccess,
  createAuthorByAdminRequestFailure,
  createAuthorByAdminRequestStart,
  updateAuthorByAdminRequestSuccess,
  updateAuthorByAdminRequestFailure,
  updateAuthorByAdminRequestStart,
  deleteAuthorByAdminRequestSuccess,
  deleteAuthorByAdminRequestFailure,
  deleteAuthorByAdminRequestStart,
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

function* handleGetAuthorsRequest(action) {
  try {
    const response = yield call(getAllRequestApi, action.payload);
    const { data, meta, } = response;
    yield put(
      getAuthorsRequestSuccess({
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
    yield put(getAuthorsRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetAuthorsByAdminRequest(action) {
  try {
    const response = yield call(getAllByAdminRequestApi, action.payload);
    const { data, meta, } = response;
    yield put(
      getAuthorsByAdminRequestSuccess({
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
    yield put(getAuthorsByAdminRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetAuthorRequest(action) {
  try {
    const response = yield call(getOneRequestApi, action.payload);
    const { data, } = response;
    yield put(getAuthorRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getAuthorRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetAuthorByAdminRequest(action) {
  try {
    const response = yield call(getOneByAdminRequestApi, action.payload);
    const { data, } = response;
    yield put(getAuthorByAdminRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getAuthorByAdminRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleCreateAuthorByAdminRequest(action) {
  try {
    const response = yield call(createOneByAdminApi, action.payload);
    const { data, } = response;
    yield put(createAuthorByAdminRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(createAuthorByAdminRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleUpdateAuthorByAdminRequest(action) {
  try {
    const response = yield call(
      updateOneByAdminApi,
      action.payload.id,
      action.payload.data
    );
    const { data, } = response;
    yield put(updateAuthorByAdminRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(updateAuthorByAdminRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleDeleteAuthorByAdminRequest(action) {
  try {
    yield call(deleteOneByAdminApi, action.payload);
    yield put(deleteAuthorByAdminRequestSuccess());
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(deleteAuthorByAdminRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

export default function* watchAuthorActions() {
  yield takeLatest(getAuthorsRequestStart.type, handleGetAuthorsRequest);
  yield takeLatest(
    getAuthorsByAdminRequestStart.type,
    handleGetAuthorsByAdminRequest
  );
  yield takeLatest(getAuthorRequestStart.type, handleGetAuthorRequest);
  yield takeLatest(
    getAuthorByAdminRequestStart.type,
    handleGetAuthorByAdminRequest
  );
  yield takeLatest(
    createAuthorByAdminRequestStart.type,
    handleCreateAuthorByAdminRequest
  );
  yield takeLatest(
    updateAuthorByAdminRequestStart.type,
    handleUpdateAuthorByAdminRequest
  );
  yield takeLatest(
    deleteAuthorByAdminRequestStart.type,
    handleDeleteAuthorByAdminRequest
  );
}
