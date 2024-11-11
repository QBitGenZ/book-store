import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  shop: null,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    getShopRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getShopRequestSuccess: (state, action) => {
      state.loading = false;
      state.shop = action.payload;
    },
    getShopRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateShopRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateShopRequestSuccess: (state, action) => {
      state.loading = false;
      state.shop = action.payload;
    },
    updateShopRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePhotoRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deletePhotoRequestSuccess: (state, action) => {
      state.loading = false;
      state.shop = action.payload;
    },
    deletePhotoRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  deletePhotoRequestFailure,
  deletePhotoRequestStart,
  deletePhotoRequestSuccess,
  getShopRequestFailure,
  getShopRequestStart,
  getShopRequestSuccess,
  updateShopRequestFailure,
  updateShopRequestStart,
  updateShopRequestSuccess,
} = configSlice.actions;

export default configSlice.reducer;
