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
import productReducer from './product/slice';
import userReducer from './user/slice';
import cartReducer from './cart/slice';
import orderReducer from './order/slice';
import addressReducer from './address/slice';
import eventReducer from './event/slice';
import formatReducer from './format/slice';
import statisticReducer from './statistic/slice';
import donationReducer from './donation/slice';
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
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    address: addressReducer,
    event: eventReducer,
    format: formatReducer,
    statistic: statisticReducer,
    donation: donationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools:
    process.env.NODE_ENV !== 'production' ? composeWithDevTools() : undefined,
});

sagaMiddleware.run(rootSaga);

export default store;
