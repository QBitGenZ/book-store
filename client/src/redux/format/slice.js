import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  formats: [],
  format: null,
  meta: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
  donateSuccess: false,
  donationUpdateSuccess: false,
  statistics: null,
};

const formatSlice = createSlice({
  name: 'format',
  initialState,
  reducers: {
    getAllFormatsRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllFormatsRequestSuccess: (state, action) => {
      state.loading = false;
      state.formats = action.payload.data;
      state.meta = action.payload.meta;
    },
    getAllFormatsRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllFormatsRequestStart,
  getAllFormatsRequestSuccess,
  getAllFormatsRequestFailure,
} = formatSlice.actions;

export default formatSlice.reducer;