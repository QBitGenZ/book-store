import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  paymentStatuses: [],
  paymentStatus: null,
  meta: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const paymentStatusSlice = createSlice({
  name: 'paymentStatus',
  initialState,
  reducers: {
    getPaymentStatusesRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPaymentStatusesRequestSuccess: (state, action) => {
      state.loading = false;
      state.paymentStatuses = action.payload.data;
      state.meta = action.payload.meta;
    },
    getPaymentStatusesRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getPaymentStatusRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPaymentStatusRequestSuccess: (state, action) => {
      state.loading = false;
      state.paymentStatus = action.payload;
    },
    getPaymentStatusRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createPaymentStatusRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createPaymentStatusRequestSuccess: (state, action) => {
      state.loading = false;
      state.paymentStatus = action.payload;
      state.createSuccess = true;
    },
    createPaymentStatusRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePaymentStatusRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updatePaymentStatusRequestSuccess: (state, action) => {
      state.loading = false;
      state.paymentStatus = action.payload;
      state.updateSuccess = true;
    },
    updatePaymentStatusRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePaymentStatusRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deletePaymentStatusRequestSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    },
    deletePaymentStatusRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetPaymentStatus: (state) => {
      state.paymentStatus = null;
      state.paymentStatuses = [];
    },
  },
});

export const {
  createPaymentStatusRequestFailure,
  createPaymentStatusRequestStart,
  createPaymentStatusRequestSuccess,
  deletePaymentStatusRequestFailure,
  deletePaymentStatusRequestStart,
  deletePaymentStatusRequestSuccess,
  getPaymentStatusRequestFailure,
  getPaymentStatusRequestStart,
  getPaymentStatusRequestSuccess,
  getPaymentStatusesRequestFailure,
  getPaymentStatusesRequestStart,
  getPaymentStatusesRequestSuccess,
  updatePaymentStatusRequestFailure,
  updatePaymentStatusRequestStart,
  updatePaymentStatusRequestSuccess,
  resetPaymentStatus,

} = paymentStatusSlice.actions;

export default paymentStatusSlice.reducer;
