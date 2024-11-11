const { put, takeLatest, call, } = require('redux-saga/effects');
const { showSnackbar, } = require('../snackbar/slice');
const {
  getTypesRequestFailure,
  getTypesRequestSuccess,
  getTypesRequestStart,
  getTypesByAdminRequestSuccess,
  getTypesByAdminRequestFailure,
  getTypesByAdminRequestStart,
  getTypeRequestSuccess,
  getTypeRequestFailure,
  getTypeByAdminRequestSuccess,
  getTypeByAdminRequestFailure,
  getTypeRequestStart,
  getTypeByAdminRequestStart,
  createTypeByAdminRequestSuccess,
  createTypeByAdminRequestFailure,
  createTypeByAdminRequestStart,
  updateTypeByAdminRequestSuccess,
  updateTypeByAdminRequestFailure,
  updateTypeByAdminRequestStart,
  deleteTypeByAdminRequestSuccess,
  deleteTypeByAdminRequestFailure,
  deleteTypeByAdminRequestStart,
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

function* handleGetTypesRequest(action) {
  try {
    const response = yield call(getAllRequestApi, action.payload);
    const { data, meta, } = response;
    yield put(
      getTypesRequestSuccess({
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
    yield put(getTypesRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetTypesByAdminRequest(action) {
  try {
    const response = yield call(getAllByAdminRequestApi, action.payload);
    const { data, meta, } = response;
    yield put(
      getTypesByAdminRequestSuccess({
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
    yield put(getTypesByAdminRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetTypeRequest(action) {
  try {
    const response = yield call(getOneRequestApi, action.payload);
    const { data, } = response;
    yield put(getTypeRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getTypeRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleGetTypeByAdminRequest(action) {
  try {
    const response = yield call(getOneByAdminRequestApi, action.payload);
    const { data, } = response;
    yield put(getTypeByAdminRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getTypeByAdminRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleCreateTypeByAdminRequest(action) {
  try {
    const response = yield call(createOneByAdminApi, action.payload);
    const { data, } = response;
    yield put(createTypeByAdminRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(createTypeByAdminRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleUpdateTypeByAdminRequest(action) {
  try {
    const response = yield call(
      updateOneByAdminApi,
      action.payload.id,
      action.payload.data
    );
    const { data, } = response;
    yield put(updateTypeByAdminRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(updateTypeByAdminRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

function* handleDeleteTypeByAdminRequest(action) {
  try {
    yield call(deleteOneByAdminApi, action.payload);
    yield put(deleteTypeByAdminRequestSuccess());
    yield put(
      showSnackbar({
        message: 'Request successful!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(deleteTypeByAdminRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: `Request failed: ${err.message}`,
        severity: 'error',
      })
    );
  }
}

export default function* watchTypesActions() {
  yield takeLatest(getTypesRequestStart.type, handleGetTypesRequest);
  yield takeLatest(
    getTypesByAdminRequestStart.type,
    handleGetTypesByAdminRequest
  );
  yield takeLatest(getTypeRequestStart.type, handleGetTypeRequest);
  yield takeLatest(
    getTypeByAdminRequestStart.type,
    handleGetTypeByAdminRequest
  );
  yield takeLatest(
    createTypeByAdminRequestStart.type,
    handleCreateTypeByAdminRequest
  );
  yield takeLatest(
    updateTypeByAdminRequestStart.type,
    handleUpdateTypeByAdminRequest
  );
  yield takeLatest(
    deleteTypeByAdminRequestStart.type,
    handleDeleteTypeByAdminRequest
  );
}
