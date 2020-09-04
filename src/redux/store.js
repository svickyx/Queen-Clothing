import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

const middlewares = [logger, thunk];

export const store = createStore(rootReducer,applyMiddleware(...middlewares));

export const persistor = persistStore(store);

// 1) 當安裝好npm install redux-persist
// 2) import {persisStore}, 3) export store 4) export persistor 5) 最後面default也要改成現在這樣
// 3） time to update root reducer


export default {store, persistor};

