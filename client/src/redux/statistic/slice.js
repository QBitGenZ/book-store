import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  allStatistics: null,
  productsStatistics: null,
  typesStatistics: null,
  authorsStatistics: null,
  publishersStatistics: null,
  revenueStatistics: null,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    // All statistic actions
    getAllStatisticsRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllStatisticsRequestSuccess: (state, action) => {
      state.loading = false;
      state.allStatistics = action.payload;
    },
    getAllStatisticsRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Products statistic actions
    getProductsStatisticsRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProductsStatisticsRequestSuccess: (state, action) => {
      state.loading = false;
      state.productsStatistics = action.payload;
    },
    getProductsStatisticsRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Types statistic actions
    getTypesStatisticsRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTypesStatisticsRequestSuccess: (state, action) => {
      state.loading = false;
      state.typesStatistics = action.payload;
    },
    getTypesStatisticsRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Authors statistic actions
    getAuthorsStatisticsRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAuthorsStatisticsRequestSuccess: (state, action) => {
      state.loading = false;
      state.authorsStatistics = action.payload;
    },
    getAuthorsStatisticsRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Publishers statistic actions
    getPublishersStatisticsRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getPublishersStatisticsRequestSuccess: (state, action) => {
      state.loading = false;
      state.publishersStatistics = action.payload;
    },
    getPublishersStatisticsRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getRevenueStatisticsRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getRevenueStatisticsRequestSuccess: (state, action) => {
      state.loading = false;
      state.revenueStatistics = action.payload;
    },
    getRevenueStatisticsRequestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllStatisticsRequestStart,
  getAllStatisticsRequestSuccess,
  getAllStatisticsRequestFailure,
  getProductsStatisticsRequestStart,
  getProductsStatisticsRequestSuccess,
  getProductsStatisticsRequestFailure,
  getTypesStatisticsRequestStart,
  getTypesStatisticsRequestSuccess,
  getTypesStatisticsRequestFailure,
  getAuthorsStatisticsRequestStart,
  getAuthorsStatisticsRequestSuccess,
  getAuthorsStatisticsRequestFailure,
  getPublishersStatisticsRequestStart,
  getPublishersStatisticsRequestSuccess,
  getPublishersStatisticsRequestFailure,
  getRevenueStatisticsRequestStart,
  getRevenueStatisticsRequestFailure,
  getRevenueStatisticsRequestSuccess,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
