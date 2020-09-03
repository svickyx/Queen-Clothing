// import SHOP_DATA from './shopdata'; 資料已經都在後端了，不需要在前端引進
import shopActionTypes from '../shop/shop-types';

const INITIAL_STATE = {
    collections: null
}

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case shopActionTypes.UPDATE_COllECTIONS:
            return{
                ...state,
                collections: action.payload
            };
        default:
            return state
    }
};

export default shopReducer;