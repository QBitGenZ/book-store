import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  publishers: [],
  publisher: null,
  meta: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const publisherSlice = createSlice({
  name: 'publisher',
  initialState,
  reducers: {
    getPublishersRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPublishersRequestSuccess: (state, action) => {
      state.loading = false;
      state.publishers = action.payload.data;
      state.meta = action.payload.meta;
    },
    getPublishersRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getPublishersByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPublishersByAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.publishers = action.payload.data;
      state.meta = action.payload.meta;
    },
    getPublishersByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getPublisherRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPublisherRequestSuccess: (state, action) => {
      state.loading = false;
      state.publisher = action.payload;
    },
    getPublisherRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getPublisherByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPublisherByAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.publisher = action.payload;
    },
    getPublisherByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createPublisherByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createPublisherByAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.publisher = action.payload;
      state.createSuccess = true;
    },
    createPublisherByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePublisherByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updatePublisherByAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.publisher = action.payload;
      state.updateSuccess = true;
    },
    updatePublisherByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePublisherByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deletePublisherByAdminRequestSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    },
    deletePublisherByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getPublishersRequestStart,
  getPublishersRequestSuccess,
  getPublishersRequestFailure,
  getPublishersByAdminRequestStart,
  getPublishersByAdminRequestSuccess,
  getPublishersByAdminRequestFailure,
  getPublisherRequestStart,
  getPublisherRequestSuccess,
  getPublisherRequestFailure,
  getPublisherByAdminRequestStart,
  getPublisherByAdminRequestSuccess,
  getPublisherByAdminRequestFailure,
  createPublisherByAdminRequestStart,
  createPublisherByAdminRequestSuccess,
  createPublisherByAdminRequestFailure,
  updatePublisherByAdminRequestStart,
  updatePublisherByAdminRequestSuccess,
  updatePublisherByAdminRequestFailure,
  deletePublisherByAdminRequestStart,
  deletePublisherByAdminRequestSuccess,
  deletePublisherByAdminRequestFailure,
} = publisherSlice.actions;

export default publisherSlice.reducer;
