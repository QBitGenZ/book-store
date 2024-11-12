import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  donations: [],
  donation: null,
  meta: null,
  createSuccess: false,
  deleteSuccess: false,
};

const donationSlice = createSlice({
  name: 'donation',
  initialState,
  reducers: {
    getDonationsRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDonationsRequestSuccess: (state, action) => {
      state.loading = false;
      state.donations = action.payload.data;
      state.meta = action.payload.meta;
    },
    getDonationsRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getDonationRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDonationRequestSuccess: (state, action) => {
      state.loading = false;
      state.donation = action.payload;
    },
    getDonationRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createDonationRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createDonationRequestSuccess: (state, action) => {
      state.loading = false;
      state.donation = action.payload;
      state.createSuccess = true;
    },
    createDonationRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteDonationRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteDonationRequestSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    },
    deleteDonationRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getDonationsRequestStart,
  getDonationsRequestSuccess,
  getDonationsRequestFailure,
  getDonationRequestStart,
  getDonationRequestSuccess,
  getDonationRequestFailure,
  createDonationRequestStart,
  createDonationRequestSuccess,
  createDonationRequestFailure,
  deleteDonationRequestStart,
  deleteDonationRequestSuccess,
  deleteDonationRequestFailure,
} = donationSlice.actions;

export default donationSlice.reducer;
