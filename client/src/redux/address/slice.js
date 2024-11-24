import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  addresses: [],
  address: null,
  meta: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    getAddressesRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAddressesRequestSuccess: (state, action) => {
      state.loading = false;
      state.addresses = action.payload.data;
      state.meta = action.payload.meta;
    },
    getAddressesRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAddressRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAddressRequestSuccess: (state, action) => {
      state.loading = false;
      state.address = action.payload;
    },
    getAddressRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createAddressRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createAddressRequestSuccess: (state, action) => {
      state.loading = false;
      state.address = action.payload;
      state.createSuccess = true;
    },
    createAddressRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAddressRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updateAddressRequestSuccess: (state, action) => {
      state.loading = false;
      state.address = action.payload;
      state.updateSuccess = true;
    },
    updateAddressRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteAddressRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteAddressRequestSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    },
    deleteAddressRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetSuccessStates: (state) => {
      state.createSuccess = false;
      state.updateSuccess = false;
      state.deleteSuccess = false;
    },
    resetAddressStates: (state) => {
      state.address = null;
      state.updateSuccess = false;
    },
  },
});

export const {
  getAddressesRequestStart,
  getAddressesRequestSuccess,
  getAddressesRequestFailure,
  getAddressRequestStart,
  getAddressRequestSuccess,
  getAddressRequestFailure,
  createAddressRequestStart,
  createAddressRequestSuccess,
  createAddressRequestFailure,
  updateAddressRequestStart,
  updateAddressRequestSuccess,
  updateAddressRequestFailure,
  deleteAddressRequestStart,
  deleteAddressRequestSuccess,
  deleteAddressRequestFailure,
  resetSuccessStates,
  resetAddressStates,
} = addressSlice.actions;

export default addressSlice.reducer;
