import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  deliveryMethods: [],
  deliveryMethod: null,
  meta: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const deliveryMethodSlice = createSlice({
  name: 'deliveryMethod',
  initialState,
  reducers: {
    getDeliveryMethodsRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDeliveryMethodsRequestSuccess: (state, action) => {
      state.loading = false;
      state.deliveryMethods = action.payload.data;
      state.meta = action.payload.meta;
    },
    getDeliveryMethodsRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getDeliveryMethodRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDeliveryMethodRequestSuccess: (state, action) => {
      state.loading = false;
      state.deliveryMethod = action.payload;
    },
    getDeliveryMethodRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createDeliveryMethodRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createDeliveryMethodRequestSuccess: (state, action) => {
      state.loading = false;
      state.deliveryMethod = action.payload;
      state.createSuccess = true;
    },
    createDeliveryMethodRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateDeliveryMethodRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updateDeliveryMethodRequestSuccess: (state, action) => {
      state.loading = false;
      state.deliveryMethod = action.payload;
      state.updateSuccess = true;
    },
    updateDeliveryMethodRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteDeliveryMethodRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteDeliveryMethodRequestSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    },
    deleteDeliveryMethodRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createDeliveryMethodRequestFailure,
  createDeliveryMethodRequestStart,
  createDeliveryMethodRequestSuccess,
  deleteDeliveryMethodRequestFailure,
  deleteDeliveryMethodRequestStart,
  deleteDeliveryMethodRequestSuccess,
  getDeliveryMethodRequestFailure,
  getDeliveryMethodRequestStart,
  getDeliveryMethodRequestSuccess,
  getDeliveryMethodsRequestFailure,
  getDeliveryMethodsRequestStart,
  getDeliveryMethodsRequestSuccess,
  updateDeliveryMethodRequestFailure,
  updateDeliveryMethodRequestStart,
  updateDeliveryMethodRequestSuccess,
} = deliveryMethodSlice.actions;

export default deliveryMethodSlice.reducer;
