import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import graphReducer from './drawReducer';

const rootReducer = combineReducers({
    graph: graphReducer,
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;