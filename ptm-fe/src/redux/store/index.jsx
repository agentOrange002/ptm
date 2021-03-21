import {createStore,applyMiddleware } from 'redux';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import combineReducers from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxMiddleware from 'react-block-ui/lib/reduxMiddleware'
//import reduxMiddleware from 'react-block-ui/reduxMiddleware';
//let middleware = [];
let AM;
if (process.env.NODE_ENV === 'development') {
    // middleware = [...middleware, thunk, logger];
    // aw = composeWithDevTools(applyMiddleware(thunk,logger));
   // middleware = [...middleware, thunk];
   AM = composeWithDevTools(applyMiddleware(thunk,logger,reduxMiddleware));
} 
else {
    // middleware = [...middleware, thunk];
    // aw = applyMiddleware(thunk);

   // middleware = [...middleware, thunk, logger];
   
    AM = applyMiddleware(thunk,reduxMiddleware);
}

export const store = createStore(
    combineReducers,AM);

// export const store = createStore(
//     combineReducers,
//     composeWithDevTools(
//         applyMiddleware(
//             thunk,
//             logger)));

//export const persistor = persistStore(store);

export const persistor = persistStore(store)

//export default {store,persistor};