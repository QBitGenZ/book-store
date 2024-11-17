import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  cart: null,
  meta: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getCartRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getCartRequestSuccess: (state, action) => {
      state.loading = false;
      state.cart = action.payload.data;
    },
    getCartRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createCartRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createCartRequestSuccess: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.createSuccess = true;
    },
    createCartRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateCartRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updateCartRequestSuccess: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.updateSuccess = true;
    },
    updateCartRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteCartRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteCartRequestSuccess: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      state.deleteSuccess = true;
    },
    deleteCartRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteAllCartRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteAllCartRequestSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
      state.cart = {
        cart: {
          items: [],
        },
      };
    },
    deleteAllCartRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetState: (state) => {
      state.createSuccess = false;
      state.updateSuccess = false;
      state.deleteSuccess = false;
    },
  },
});

export const {
  getCartRequestStart,
  getCartRequestSuccess,
  getCartRequestFailure,
  createCartRequestStart,
  createCartRequestSuccess,
  createCartRequestFailure,
  updateCartRequestStart,
  updateCartRequestSuccess,
  updateCartRequestFailure,
  deleteCartRequestStart,
  deleteCartRequestSuccess,
  deleteCartRequestFailure,
  deleteAllCartRequestStart,
  deleteAllCartRequestSuccess,
  deleteAllCartRequestFailure,
  resetState,
} = cartSlice.actions;

export default cartSlice.reducer;
