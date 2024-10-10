import { all, } from 'redux-saga/effects';
import authSaga from './auth/saga';
import configSaga from './config/saga';
import typeSaga from './productType/saga';
import authorSaga from './author/saga';
import publisherSaga from './publisher/saga';
import deliveryMethodSaga from './deliveryMethod/saga';
import deliveryStatusSaga from './deliveryStatus/saga';
import paymentMethodSaga from './paymentMethod/saga';
import paymentStatusSaga from './paymentStatus/saga';
import productSaga from './product/saga';
import userSaga from './user/saga';
import cartSage from './cart/saga';
import orderSaga from './order/saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    configSaga(),
    typeSaga(),
    authorSaga(),
    publisherSaga(),
    deliveryMethodSaga(),
    deliveryStatusSaga(),
    paymentMethodSaga(),
    paymentStatusSaga(),
    productSaga(),
    userSaga(),
    cartSage(),
    orderSaga(),
  ]);
}
