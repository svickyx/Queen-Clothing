import {takeLatest, call, put, all } from 'redux-saga/effects';
//it listen for every action of a specific type that we pass to it
//it create a non blocking call in order to not stop application to run 
// put is saga effects for creating action

import { firestore, convertCollectionsSnopshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop-actions';

import ShopActionTypes from './shop-types';

//generator function syntax is for saga, every generator function must have yield in it

export function* fetchCollectionsAsync(){
    try{
        const collectionRef = firestore.collection('collections');
        const snopshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnopshotToMap, snopshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    }catch(error) {
        yield put(fetchCollectionsFailure(error.message));
    }
    //call 後面括號裡面，第一個para可以是一個method/function, 第二個para,是前面function的parameter
    //yield call 是之前寫的const collectionsMap = convertCollectionsSnopshotToMap(snopshot);saga替代版本
    
         //thunk version
            // collectionRef.get().then(snopshot => {
            //     const collectionsMap = convertCollectionsSnopshotToMap(snopshot);
            //     dispatch(fetchCollectionsSuccess(collectionsMap));
            // }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
        );
}

export function* shopSaga() {
    yield all([
        call(fetchCollectionsStart)
    ])
}


