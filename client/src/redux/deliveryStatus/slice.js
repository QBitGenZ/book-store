import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  deliveryStatuses: [],
  deliveryStatus: null,
  meta: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const deliveryStatuesSlice = createSlice({
  name: 'deliveryStatus',
  initialState,
  reducers: {
    getDeliveryStatusesRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDeliveryStatusesRequestSuccess: (state, action) => {
      state.loading = false;
      state.deliveryStatuses = action.payload.data;
      state.meta = action.payload.meta;
    },
    getDeliveryStatusesRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getDeliveryStatusRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDeliveryStatusRequestSuccess: (state, action) => {
      state.loading = false;
      state.deliveryStatus = action.payload;
    },
    getDeliveryStatusRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createDeliveryStatusRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createDeliveryStatusRequestSuccess: (state, action) => {
      state.loading = false;
      state.deliveryStatus = action.payload;
      state.createSuccess = true;
    },
    createDeliveryStatusRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateDeliveryStatusRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updateDeliveryStatusRequestSuccess: (state, action) => {
      state.loading = false;
      state.deliveryStatus = action.payload;
      state.updateSuccess = true;
    },
    updateDeliveryStatusRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteDeliveryStatusRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteDeliveryStatusRequestSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    },
    deleteDeliveryStatusRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createDeliveryStatusRequestFailure,
  createDeliveryStatusRequestStart,
  createDeliveryStatusRequestSuccess,
  deleteDeliveryStatusRequestFailure,
  deleteDeliveryStatusRequestStart,
  deleteDeliveryStatusRequestSuccess,
  getDeliveryStatusRequestFailure,
  getDeliveryStatusRequestStart,
  getDeliveryStatusRequestSuccess,
  getDeliveryStatusesRequestFailure,
  getDeliveryStatusesRequestStart,
  getDeliveryStatusesRequestSuccess,
  updateDeliveryStatusRequestFailure,
  updateDeliveryStatusRequestStart,
  updateDeliveryStatusRequestSuccess,
} = deliveryStatuesSlice.actions;

export default deliveryStatuesSlice.reducer;
