// store.js
import { configureStore, } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools, } from 'redux-devtools-extension';
import authReducer from './auth/slice';
import snackbarReducer from './snackbar/slice';
import configReducer from './config/slice';
import typeReducer from './productType/slice';
import authorReducer from './author/slice';
import publisherReducer from './publisher/slice';
import deliveryMethodReducer from './deliveryMethod/slice';
import deliveryStatusReducer from './deliveryStatus/slice';
import paymentMethodReducer from './paymentMethod/slice';
import paymentStatusReducer from './paymentStatus/slice';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
    config: configReducer,
    type: typeReducer,
    author: authorReducer,
    publisher: publisherReducer,
    deliveryMethod: deliveryMethodReducer,
    deliveryStatus: deliveryStatusReducer,
    paymentMethod: paymentMethodReducer,
    paymentStatus: paymentStatusReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools:
    process.env.NODE_ENV !== 'production' ? composeWithDevTools() : undefined,
});

sagaMiddleware.run(rootSaga);

export default store;
