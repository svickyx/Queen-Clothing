import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
//這個storage是可以我們access to localStorage object on window browser, i want to use localStorage as default storage. (sessionStorage)

import userReducer from '../redux/user/user-reducer';
import cartReducer from '../redux/cart/cart-reducer';
import directoryReducer from '../redux/directory/directory-reducer';
import shopReducer from '../redux/shop/shop-reducer';

const persistConfig = {
    key: 'root',
    storage, 
    whitelist: ['cart']
}

//要定義一個persistConfig, key是we want to start from root reducer, whitelist是哪些reducer 你要store, 
//要寫成string形式，因為user已經被firebase處理了，所以這裡只放入cart



const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);

// 把新寫的persistConfig和rootReducer都放進persistReducer裡面去，然後去index.js把persistor放進去
