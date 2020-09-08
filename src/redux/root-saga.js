import { all, call } from 'redux-saga/effects';
import { shopSaga } from './shop/shop-sagas';
import { userSaga } from '../redux/user/user-saga';
import { cartSaga } from './cart/cart-sagas';

export function* rootSaga() {
    yield all([
        call(userSaga),
        call(cartSaga),
        call(shopSaga)
    ]);
}