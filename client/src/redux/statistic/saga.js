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
  getTypesStatisticsRequestFailure,
  getTypesStatisticsRequestStart,
  getTypesStatisticsRequestSuccess, } from './slice';
import { getAllStatistics,
  getAuthorsStatistics,
  getProductsStatistics,
  getPublishersStatistics,
  getTypesStatistics, } from './api';

function* handleGetAllStatistics() {
  try {
    const response = yield call(getAllStatistics);
    const data = response;
    yield put(getAllStatisticsRequestSuccess(data));
    yield put(showSnackbar({
      message: 'All statistic fetched successfully!', severity: 'success',
    }));
  } catch (err) {
    yield put(getAllStatisticsRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch all statistics: ${err.message}`, severity: 'error',
    }));
  }
}

function* handleGetProductsStatistics() {
  try {
    const response = yield call(getProductsStatistics);
    yield put(getProductsStatisticsRequestSuccess(response));
    yield put(showSnackbar({
      message: 'Products statistic fetched successfully!', severity: 'success',
    }));
  } catch (err) {
    yield put(getProductsStatisticsRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch products statistics: ${err.message}`, severity: 'error',
    }));
  }
}

function* handleGetTypesStatistics() {
  try {
    const response = yield call(getTypesStatistics);
    yield put(getTypesStatisticsRequestSuccess(response));
    yield put(showSnackbar({
      message: 'Types statistic fetched successfully!', severity: 'success',
    }));
  } catch (err) {
    yield put(getTypesStatisticsRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch types statistics: ${err.message}`, severity: 'error',
    }));
  }
}

function* handleGetAuthorsStatistics() {
  try {
    const response = yield call(getAuthorsStatistics);
    yield put(getAuthorsStatisticsRequestSuccess(response));
    yield put(showSnackbar({
      message: 'Authors statistic fetched successfully!', severity: 'success',
    }));
  } catch (err) {
    yield put(getAuthorsStatisticsRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch authors statistics: ${err.message}`, severity: 'error',
    }));
  }
}

function* handleGetPublishersStatistics() {
  try {
    const response = yield call(getPublishersStatistics);
    yield put(getPublishersStatisticsRequestSuccess(response));
    yield put(showSnackbar({
      message: 'Publishers statistic fetched successfully!', severity: 'success',
    }));
  } catch (err) {
    yield put(getPublishersStatisticsRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch publishers statistics: ${err.message}`, severity: 'error',
    }));
  }
}

export default function* watchStatisticsActions() {
  yield takeLatest(getAllStatisticsRequestStart.type, handleGetAllStatistics);
  yield takeLatest(getProductsStatisticsRequestStart.type, handleGetProductsStatistics);
  yield takeLatest(getTypesStatisticsRequestStart.type, handleGetTypesStatistics);
  yield takeLatest(getAuthorsStatisticsRequestStart.type, handleGetAuthorsStatistics);
  yield takeLatest(getPublishersStatisticsRequestStart.type, handleGetPublishersStatistics);
}
