// import SHOP_DATA from './shopdata'; 資料已經都在後端了，不需要在前端引進
import ShopActionTypes from '../shop/shop-types';

const INITIAL_STATE = {
    collections: null,
    //redux-thunk related:
    isFetching: false,
    errorMessage: undefined
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ShopActionTypes.FETCH_COLLECTIONS_START:
            return {
                ...state,
                isFetching: true
            }
        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        // case ShopActionTypes.UPDATE_COllECTIONS:
        //     return{
        //         ...state,
        //         collections: action.payload
        //     };
        default:
            return state
    }
};

export default shopReducer;