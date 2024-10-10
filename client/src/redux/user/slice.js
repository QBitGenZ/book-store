import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  users: [],
  user: null,
  meta: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserAllRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserAllRequestSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
      state.meta = action.payload.meta;
    },
    getUserAllRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllAdminRequestsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllAdminRequestsSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
      state.meta = action.payload.meta;
    },
    getAllAdminRequestsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createUserByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createUserByAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.createSuccess = true;
    },
    createUserByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getUserByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserByAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getUserByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateUserByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updateUserByAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.updateSuccess = true;
    },
    updateUserByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteUserByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteUserByAdminRequestSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    },
    deleteUserByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getUserRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserRequestSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getUserRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getUserAllRequestStart,
  getUserAllRequestSuccess,
  getUserAllRequestFailure,
  getAllAdminRequestsStart,
  getAllAdminRequestsSuccess,
  getAllAdminRequestsFailure,
  createUserByAdminRequestStart,
  createUserByAdminRequestSuccess,
  createUserByAdminRequestFailure,
  getUserByAdminRequestStart,
  getUserByAdminRequestSuccess,
  getUserByAdminRequestFailure,
  updateUserByAdminRequestStart,
  updateUserByAdminRequestSuccess,
  updateUserByAdminRequestFailure,
  deleteUserByAdminRequestStart,
  deleteUserByAdminRequestSuccess,
  deleteUserByAdminRequestFailure,
  getUserRequestStart,
  getUserRequestSuccess,
  getUserRequestFailure,
} = userSlice.actions;

export default userSlice.reducer;
