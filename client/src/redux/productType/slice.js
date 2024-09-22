import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  types: [],
  type: null,
  meta: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    getTypesRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTypesRequestSuccess: (state, action) => {
      state.loading = false;
      state.types = action.payload.data;
      state.meta = action.payload.meta;
    },
    getTypesRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getTypesByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTypesByAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.types = action.payload.data;
      state.meta = action.payload.meta;
    },
    getTypesByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getTypeRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTypeRequestSuccess: (state, action) => {
      state.loading = false;
      state.type = action.payload;
    },
    getTypeRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getTypeByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTypeByAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.type = action.payload;
    },
    getTypeByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createTypeByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createTypeByAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.type = action.payload;
      state.createSuccess = true;
    },
    createTypeByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTypeByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updateTypeByAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.type = action.payload;
      state.updateSuccess = true;
    },
    updateTypeByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTypeByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteTypeByAdminRequestSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    },
    deleteTypeByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getTypeByAdminRequestFailure,
  getTypeByAdminRequestStart,
  getTypeByAdminRequestSuccess,
  getTypeRequestFailure,
  getTypeRequestStart,
  getTypeRequestSuccess,
  getTypesByAdminRequestFailure,
  getTypesByAdminRequestStart,
  getTypesByAdminRequestSuccess,
  getTypesRequestFailure,
  getTypesRequestStart,
  createTypeByAdminRequestFailure,
  createTypeByAdminRequestStart,
  createTypeByAdminRequestSuccess,
  deleteTypeByAdminRequestFailure,
  deleteTypeByAdminRequestStart,
  deleteTypeByAdminRequestSuccess,
  getTypesRequestSuccess,
  updateTypeByAdminRequestFailure,
  updateTypeByAdminRequestStart,
  updateTypeByAdminRequestSuccess,
} = typeSlice.actions;

export default typeSlice.reducer;
