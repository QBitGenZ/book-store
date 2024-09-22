import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  paymentMethods: [],
  paymentMethod: null,
  meta: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const paymentMethodSlice = createSlice({
  name: 'paymentMethod',
  initialState,
  reducers: {
    getPaymentMethodsRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPaymentMethodsRequestSuccess: (state, action) => {
      state.loading = false;
      state.paymentMethods = action.payload.data;
      state.meta = action.payload.meta;
    },
    getPaymentMethodsRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getPaymentMethodRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPaymentMethodRequestSuccess: (state, action) => {
      state.loading = false;
      state.paymentMethod = action.payload;
    },
    getPaymentMethodRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createPaymentMethodRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createPaymentMethodRequestSuccess: (state, action) => {
      state.loading = false;
      state.paymentMethod = action.payload;
      state.createSuccess = true;
    },
    createPaymentMethodRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePaymentMethodRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updatePaymentMethodRequestSuccess: (state, action) => {
      state.loading = false;
      state.paymentMethod = action.payload;
      state.updateSuccess = true;
    },
    updatePaymentMethodRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePaymentMethodRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deletePaymentMethodRequestSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    },
    deletePaymentMethodRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createPaymentMethodRequestFailure,
  createPaymentMethodRequestStart,
  createPaymentMethodRequestSuccess,
  deletePaymentMethodRequestFailure,
  deletePaymentMethodRequestStart,
  deletePaymentMethodRequestSuccess,
  getPaymentMethodRequestFailure,
  getPaymentMethodRequestStart,
  getPaymentMethodRequestSuccess,
  getPaymentMethodsRequestFailure,
  getPaymentMethodsRequestStart,
  getPaymentMethodsRequestSuccess,
  updatePaymentMethodRequestFailure,
  updatePaymentMethodRequestStart,
  updatePaymentMethodRequestSuccess,
} = paymentMethodSlice.actions;

export default paymentMethodSlice.reducer;
