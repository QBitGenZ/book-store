import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  orders: [],
  order: null,
  meta: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getAllOrderRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllOrderRequestSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload.data;
      state.meta = action.payload.meta;

    },
    getAllOrderRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllByAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload.data;
      state.meta = action.payload.meta;
    },
    getAllByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createOrderRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createOrderRequestSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.createSuccess = true;
    },
    createOrderRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updateOrderRequestSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.updateSuccess = true;
    },
    updateOrderRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllOrderRequestStart,
  getAllOrderRequestSuccess,
  getAllOrderRequestFailure,
  getAllByAdminRequestStart,
  getAllByAdminRequestSuccess,
  getAllByAdminRequestFailure,
  createOrderRequestStart,
  createOrderRequestSuccess,
  createOrderRequestFailure,
  updateOrderRequestStart,
  updateOrderRequestSuccess,
  updateOrderRequestFailure,
} = orderSlice.actions;

export default orderSlice.reducer;