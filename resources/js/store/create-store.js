import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from "redux-logger";
import thunkMiddleware from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import  { rootReducer } from "./reducers/rootReducer";

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger();

const store = createStore(persistedReducer,
    compose(applyMiddleware(thunkMiddleware, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));

persistStore(store);

export default store;



