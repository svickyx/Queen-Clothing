import ShopActionTypes from '../shop/shop-types';

import { firestore, convertCollectionsSnopshotToMap } from '../../firebase/firebase.utils';

// export const updateCollections = (collectionsMap) => ({
//     type: ShopActionTypes.UPDATE_COllECTIONS,
//     payload: collectionsMap
// })

//redux-thunk related:
export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.fetchCollectionsFailure,
    payload: errorMessage
})

export const fetchCollectionsStartAsync = ()=> {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());

            collectionRef.get().then(snopshot => {
                const collectionsMap = convertCollectionsSnopshotToMap(snopshot);
                dispatch(fetchCollectionsSuccess(collectionsMap));
            }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
    }
}