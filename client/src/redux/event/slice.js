import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  events: [],
  event: null,
  meta: null,
  createSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
  donateSuccess: false,
  donationUpdateSuccess: false,
  statistics: null,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    getAllEventsRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllEventsRequestSuccess: (state, action) => {
      state.loading = false;
      state.events = action.payload.data;
      state.meta = action.payload.meta;
    },
    getAllEventsRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllEventsByAdminRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllEventsByAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.events = action.payload.data;
    },
    getAllEventsByAdminRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getEventRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getEventRequestSuccess: (state, action) => {
      state.loading = false;
      state.event = action.payload;
    },
    getEventRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createEventRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.createSuccess = false;
    },
    createEventRequestSuccess: (state, action) => {
      state.loading = false;
      state.event = action.payload;
      state.createSuccess = true;
    },
    createEventRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateEventRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.updateSuccess = false;
    },
    updateEventRequestSuccess: (state, action) => {
      state.loading = false;
      state.event = action.payload;
      state.updateSuccess = true;
    },
    updateEventRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteEventRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.deleteSuccess = false;
    },
    deleteEventRequestSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    },
    deleteEventRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    donateBookRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.donateSuccess = false;
    },
    donateBookRequestSuccess: (state) => {
      state.loading = false;
      state.donateSuccess = true;
    },
    donateBookRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateDonationStatusRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.donationUpdateSuccess = false;
    },
    updateDonationStatusRequestSuccess: (state) => {
      state.loading = false;
      state.donationUpdateSuccess = true;
    },
    updateDonationStatusRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getEventStatisticsRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getEventStatisticsRequestSuccess: (state, action) => {
      state.loading = false;
      state.statistics = action.payload;
    },
    getEventStatisticsRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllEventsRequestStart,
  getAllEventsRequestSuccess,
  getAllEventsRequestFailure,
  getAllEventsByAdminRequestStart,
  getAllEventsByAdminRequestSuccess,
  getAllEventsByAdminRequestFailure,
  getEventRequestStart,
  getEventRequestSuccess,
  getEventRequestFailure,
  createEventRequestStart,
  createEventRequestSuccess,
  createEventRequestFailure,
  updateEventRequestStart,
  updateEventRequestSuccess,
  updateEventRequestFailure,
  deleteEventRequestStart,
  deleteEventRequestSuccess,
  deleteEventRequestFailure,
  donateBookRequestStart,
  donateBookRequestSuccess,
  donateBookRequestFailure,
  updateDonationStatusRequestStart,
  updateDonationStatusRequestSuccess,
  updateDonationStatusRequestFailure,
  getEventStatisticsRequestStart,
  getEventStatisticsRequestSuccess,
  getEventStatisticsRequestFailure,
} = eventSlice.actions;

export default eventSlice.reducer;
