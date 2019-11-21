import { createStore, applyMiddleware,compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' ;

import thunk from 'redux-thunk';
import rootReducer from './reducers/index'


const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

   export const store = createStore(persistedReducer, {}, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    ));
    export const persistor = persistStore(store);
    
export default {store , persistor }




