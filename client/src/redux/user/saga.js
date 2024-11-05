const { put, takeLatest, call, } = require('redux-saga/effects');
const { showSnackbar, } = require('../snackbar/slice');
const {
  getUserAllRequestFailure, getUserAllRequestSuccess, getUserAllRequestStart,
  getAllAdminRequestsSuccess, getAllAdminRequestsFailure, getAllAdminRequestsStart,
  getUserRequestSuccess, getUserRequestFailure, getUserRequestStart,
  getUserByAdminRequestSuccess, getUserByAdminRequestFailure, getUserByAdminRequestStart,
  createUserByAdminRequestSuccess, createUserByAdminRequestFailure, createUserByAdminRequestStart,
  updateUserByAdminRequestSuccess, updateUserByAdminRequestFailure, updateUserByAdminRequestStart,
  deleteUserByAdminRequestSuccess, deleteUserByAdminRequestFailure, deleteUserByAdminRequestStart,
} = require('./slice');
const {
  getAllRequestApi, getAllAdminRequestApi, getOneRequestApi, getOneByAdminRequestApi,
  createOneByAdminRequestApi, updateOneByAdminApi, deleteOneByAdminApi,
} = require('./api');

function* handleGetUserAllRequest(action) {
  try {
    const response = yield call(getAllRequestApi, action.payload);
    const { data, meta, } = response;
    yield put(getUserAllRequestSuccess({
      data, meta,
    }));

    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success',
    }));
  } catch (err) {
    yield put(getUserAllRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error',
    }));
  }
}

function* handleGetAllAdminRequests(action) {
  try {
    const response = yield call(getAllAdminRequestApi, action.payload);
    const { data, meta, } = response;
    yield put(getAllAdminRequestsSuccess({
      data, meta,
    }));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success',
    }));
  } catch (err) {
    yield put(getAllAdminRequestsFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error',
    }));
  }
}

function* handleGetUserRequest(action) {
  try {
    const response = yield call(getOneRequestApi, action.payload);
    const { data, } = response;
    yield put(getUserRequestSuccess(data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success',
    }));
  } catch (err) {
    yield put(getUserRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error',
    }));
  }
}

function* handleGetUserByAdminRequest(action) {
  try {
    const response = yield call(getOneByAdminRequestApi, action.payload);
    const { data, } = response;
    yield put(getUserByAdminRequestSuccess(data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success',
    }));
  } catch (err) {
    yield put(getUserByAdminRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error',
    }));
  }
}

function* handleCreateUserByAdminRequest(action) {
  try {
    const response = yield call(createOneByAdminRequestApi, action.payload);
    const { data, } = response;
    yield put(createUserByAdminRequestSuccess(data));
    yield put(showSnackbar({
      message: 'User created successfully!', severity: 'success',
    }));
  } catch (err) {
    yield put(createUserByAdminRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error',
    }));
  }
}

function* handleUpdateUserByAdminRequest(action) {
  try {
    const response = yield call(updateOneByAdminApi, action.payload.id, action.payload.data);
    const { data, } = response;
    yield put(updateUserByAdminRequestSuccess(data));
    yield put(showSnackbar({
      message: 'User updated successfully!', severity: 'success',
    }));
  } catch (err) {
    yield put(updateUserByAdminRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error',
    }));
  }
}

function* handleDeleteUserByAdminRequest(action) {
  try {
    yield call(deleteOneByAdminApi, action.payload);
    yield put(deleteUserByAdminRequestSuccess());
    yield put(showSnackbar({
      message: 'User deleted successfully!', severity: 'success',
    }));
  } catch (err) {
    yield put(deleteUserByAdminRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error',
    }));
  }
}

// function* handleUpdateUserRequest(action) {
//   try {
//     const response = yield call(updateOneApi, action.payload.id, action.payload.data);
//     const { data, } = response;
//     yield put(updateUserRequestSuccess(data));
//     yield put(showSnackbar({
//       message: 'User updated successfully!', severity: 'success',
//     }));
//   } catch (err) {
//     yield put(updateUserRequestFailure(err.message));
//     yield put(showSnackbar({
//       message: `Request failed: ${err.message}`, severity: 'error',
//     }));
//   }
// }
//
// function* handleDeleteUserRequest(action) {
//   try {
//     yield call(deleteOneApi, action.payload);
//     yield put(deleteUserRequestSuccess());
//     yield put(showSnackbar({
//       message: 'User deleted successfully!', severity: 'success',
//     }));
//   } catch (err) {
//     yield put(deleteUserRequestFailure(err.message));
//     yield put(showSnackbar({
//       message: `Request failed: ${err.message}`, severity: 'error',
//     }));
//   }
// }

export default function* watchUserActions() {
  yield takeLatest(getUserAllRequestStart.type, handleGetUserAllRequest);
  yield takeLatest(getAllAdminRequestsStart.type, handleGetAllAdminRequests);
  yield takeLatest(getUserRequestStart.type, handleGetUserRequest);
  yield takeLatest(getUserByAdminRequestStart.type, handleGetUserByAdminRequest);
  yield takeLatest(createUserByAdminRequestStart.type, handleCreateUserByAdminRequest);
  yield takeLatest(updateUserByAdminRequestStart.type, handleUpdateUserByAdminRequest);
  yield takeLatest(deleteUserByAdminRequestStart.type, handleDeleteUserByAdminRequest);
}
