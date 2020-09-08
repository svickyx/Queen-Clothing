import { takeLatest, all, put, call} from 'redux-saga/effects';
import { clearCart } from './cart-action';
import UserActionTypes from '../user/user-type';

export function* clearCartOnSignOut() {
    yield put(clearCart());
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}


export function* cartSaga() {
    yield all([
        call(onSignOutSuccess)
    ]);
}