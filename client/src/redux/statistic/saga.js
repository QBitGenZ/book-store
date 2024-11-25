import { call, put, takeLatest, } from 'redux-saga/effects';
import { showSnackbar, } from '../snackbar/slice';
import { getAllStatisticsRequestFailure,
  getAllStatisticsRequestStart,
  getAllStatisticsRequestSuccess,
  getAuthorsStatisticsRequestFailure,
  getAuthorsStatisticsRequestStart,
  getAuthorsStatisticsRequestSuccess,
  getProductsStatisticsRequestFailure,
  getProductsStatisticsRequestStart,
  getProductsStatisticsRequestSuccess,
  getPublishersStatisticsRequestFailure,
  getPublishersStatisticsRequestStart,
  getPublishersStatisticsRequestSuccess,
  getRevenueStatisticsRequestFailure,
  getRevenueStatisticsRequestStart,
  getRevenueStatisticsRequestSuccess,
  getTypesStatisticsRequestFailure,
  getTypesStatisticsRequestStart,
  getTypesStatisticsRequestSuccess, } from './slice';
import { getAllStatistics,
  getAuthorsStatistics,
  getProductsStatistics,
  getPublishersStatistics, getRevenueStatistics,
  getTypesStatistics, } from './api';

function* handleGetAllStatistics() {
  try {
    const response = yield call(getAllStatistics);
    const data = response;
    yield put(getAllStatisticsRequestSuccess(data));
    yield put(
      showSnackbar({
        message: 'Statistic fetched successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getAllStatisticsRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: 'Failed to fetch statistics!',
        severity: 'error',
      })
    );
  }
}

function* handleGetProductsStatistics() {
  try {
    const response = yield call(getProductsStatistics);
    yield put(getProductsStatisticsRequestSuccess(response));
    yield put(
      showSnackbar({
        message: 'Statistic fetched successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getProductsStatisticsRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: 'Failed to fetch statistics!',
        severity: 'error',
      })
    );
  }
}

function* handleGetTypesStatistics() {
  try {
    const response = yield call(getTypesStatistics);
    yield put(getTypesStatisticsRequestSuccess(response));
    yield put(
      showSnackbar({
        message: 'Types statistic fetched successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getTypesStatisticsRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: 'Failed to fetch statistics!',
        severity: 'error',
      })
    );
  }
}

function* handleGetAuthorsStatistics() {
  try {
    const response = yield call(getAuthorsStatistics);
    yield put(getAuthorsStatisticsRequestSuccess(response));
    yield put(
      showSnackbar({
        message: 'Statistic fetched successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getAuthorsStatisticsRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: 'Failed to fetch statistics!',
        severity: 'error',
      })
    );
  }
}

function* handleGetPublishersStatistics() {
  try {
    const response = yield call(getPublishersStatistics);
    yield put(getPublishersStatisticsRequestSuccess(response));
    yield put(
      showSnackbar({
        message: 'Statistic fetched successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getPublishersStatisticsRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: 'Failed to fetch statistics!',
        severity: 'error',
      })
    );
  }
}

function* handleGetRevenueStatistics(action) {
  try {
    const response = yield call(getRevenueStatistics, action.payload);
    yield put(getRevenueStatisticsRequestSuccess(response));
    yield put(
      showSnackbar({
        message: 'Statistic fetched successfully!',
        severity: 'success',
      })
    );
  } catch (err) {
    yield put(getRevenueStatisticsRequestFailure(err.message));
    yield put(
      showSnackbar({
        message: 'Failed to fetch statistics!',
        severity: 'error',
      })
    );
  }
}

export default function* watchStatisticsActions() {
  yield takeLatest(getAllStatisticsRequestStart.type, handleGetAllStatistics);
  yield takeLatest(
    getProductsStatisticsRequestStart.type,
    handleGetProductsStatistics
  );
  yield takeLatest(
    getTypesStatisticsRequestStart.type,
    handleGetTypesStatistics
  );
  yield takeLatest(
    getAuthorsStatisticsRequestStart.type,
    handleGetAuthorsStatistics
  );
  yield takeLatest(
    getPublishersStatisticsRequestStart.type,
    handleGetPublishersStatistics
  );
  yield takeLatest(
    getRevenueStatisticsRequestStart.type,
    handleGetRevenueStatistics
  );
}
