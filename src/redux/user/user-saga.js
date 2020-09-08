import { takeLatest, put, all, call } from 'redux-saga/effects';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

import UserActionTypes from './user-type';
import { signinSuccess, signinFailure, signoutSuccess, signoutFailure, signUpSuccess, signUpFailure } from './user-action';

//---------------reuseable generator function---------------

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try{
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signinSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    }catch(error){
        yield put(signinFailure(error));
    }
}
//---------------reuseable generator function---------------

export function* signInWithGoogle () {
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(signinSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    }catch(error){
        yield put(signinFailure(error));
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try{
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(signinSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    }catch(error) {
        yield put(signinFailure(error));
    }
}

  // try{
        //     await auth.signInWithEmailAndPassword(email, password);
        //     this.setState({email: '', password: ''})
        // }catch(error){
        //     console.log('error', error.message)
        // }

export function* isUserAuthenticated() {
    try{
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(signinSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    }catch(error){
        yield put(signinFailure(error));
    }
}
//在上面三個geenrator function裡面，大部分的code都是一樣的
//其實可以在action裡面直接合併，在這個file裡面另外寫一個reuserable generator function以便signInWithGoogle/signInWithEmail重複利用

export function* signOut() {
    try{
        yield auth.signOut();
        yield put(signoutSuccess());
    }catch(error){
        yield put(signoutFailure(error))
    }
}

export function* signUp({payload: {email, password, displayName}}) {
    try{
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData: {displayName}}));
    }catch(error){
        yield put(signUpFailure(error))
    }
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
    yield getSnapshotFromUserAuth(user, additionalData)
}


export function* onEmailSigninStart () {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onGoogleSigninStart () {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession () {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START,signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS,signInAfterSignUp)
}

export function* userSaga(){
    yield all([
        call(onGoogleSigninStart),
        call(onEmailSigninStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}