import { showSnackbar, } from '~/redux/snackbar/slice';
import { getAllFormatsApi, } from '~/redux/format/api';
import { getAllFormatsRequestFailure,
  getAllFormatsRequestStart,
  getAllFormatsRequestSuccess, } from '~/redux/format/slice';
import { call, put, takeLatest, } from 'redux-saga/effects';

function* handleGetAllFormatRequest(action) {
  try {
    const response = yield call(getAllFormatsApi, action.payload);
    const { data, meta, } = response;
    yield put(getAllFormatsRequestSuccess({
      data, meta,
    }));
    yield put(showSnackbar({
      message: 'Events fetched successfully!', severity: 'success',
    }));
  } catch (err) {
    yield put(getAllFormatsRequestFailure(err.message));
    yield put(showSnackbar({
      message: `Failed to fetch events: ${err.message}`, severity: 'error',
    }));
  }
}

export default function* watchFormatActions() {
  yield takeLatest(getAllFormatsRequestStart.type, handleGetAllFormatRequest);
}