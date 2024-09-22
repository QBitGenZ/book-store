const { put, takeLatest, call, } = require('redux-saga/effects');
const { showSnackbar, } = require('../snackbar/slice');
const { getShopInfoApi, updateShopInfoApi, deletePhotoApi, } = require('./api');
const { getShopRequestStart, getShopRequestSuccess, getShopRequestFailure, updateShopRequestSuccess, updateShopRequestFailure, updateShopRequestStart, deletePhotoRequestSuccess, deletePhotoRequestFailure, deletePhotoRequestStart, } = require('./slice');

function* handleGetShop(action) {
  try {
    const response = yield call(getShopInfoApi, action.payload);
    const { data, } = response;
    yield put(getShopRequestSuccess(data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  } catch(err) {
    yield put(getShopRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* handleUpdateShop(action) {
  try {
    const response = yield call(updateShopInfoApi, action.payload);
    const { data, } = response;
    yield put(updateShopRequestSuccess(data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  } catch(err) {
    yield put(updateShopRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

function* handleDeletePhoto(action) {
  try {
    const response = yield call(deletePhotoApi, action.payload);
    const { data, } = response;
    yield put(deletePhotoRequestSuccess(data));
    yield put(showSnackbar({
      message: 'Request successful!', severity: 'success', 
    }));
  } catch(err) {
    yield put(deletePhotoRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Request failed: ${err.message}`, severity: 'error', 
    }));
  }
}

export default function* watchConfigActions() {
  yield takeLatest(getShopRequestStart.type, handleGetShop);
  yield takeLatest(updateShopRequestStart.type, handleUpdateShop);
  yield takeLatest(deletePhotoRequestStart.type, handleDeletePhoto);
}