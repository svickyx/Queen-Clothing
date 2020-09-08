import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import {rootSaga} from './root-saga';
import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware];

export const store = createStore(rootReducer,applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);
//錯誤： 注意這個順序，要放在const store這一行的下面

export const persistor = persistStore(store);

// 1) 當安裝好npm install redux-persist
// 2) import {persisStore}, 3) export store 4) export persistor 5) 最後面default也要改成現在這樣
// 3） time to update root reducer


export default {store, persistor};

