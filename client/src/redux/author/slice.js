import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  authors: [],
  author: null,
  meta: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    getAuthorsRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAuthorsRequestSuccess: (state, action) => {
      state.loading = false;
      state.authors = action.payload.data;
      state.meta = action.payload.meta;
    },
    getAuthorsRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAuthorsByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAuthorsByAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.authors = action.payload.data;
      state.meta = action.payload.meta;
    },
    getAuthorsByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAuthorRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAuthorRequestSuccess: (state, action) => {
      state.loading = false;
      state.author = action.payload;
    },
    getAuthorRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAuthorByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAuthorByAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.author = action.payload;
    },
    getAuthorByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createAuthorByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createAuthorByAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.author = action.payload;
      state.createSuccess = true;
    },
    createAuthorByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAuthorByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updateAuthorByAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.author = action.payload;
      state.updateSuccess = true;
    },
    updateAuthorByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteAuthorByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteAuthorByAdminRequestSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    },
    deleteAuthorByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAuthorsRequestStart,
  getAuthorsRequestSuccess,
  getAuthorsRequestFailure,
  getAuthorsByAdminRequestStart,
  getAuthorsByAdminRequestSuccess,
  getAuthorsByAdminRequestFailure,
  getAuthorRequestStart,
  getAuthorRequestSuccess,
  getAuthorRequestFailure,
  getAuthorByAdminRequestStart,
  getAuthorByAdminRequestSuccess,
  getAuthorByAdminRequestFailure,
  createAuthorByAdminRequestStart,
  createAuthorByAdminRequestSuccess,
  createAuthorByAdminRequestFailure,
  updateAuthorByAdminRequestStart,
  updateAuthorByAdminRequestSuccess,
  updateAuthorByAdminRequestFailure,
  deleteAuthorByAdminRequestStart,
  deleteAuthorByAdminRequestSuccess,
  deleteAuthorByAdminRequestFailure,
} = authorSlice.actions;

export default authorSlice.reducer;
