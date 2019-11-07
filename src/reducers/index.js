import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import notesReducer from './notesReducer';
import graphReducer from './drawReducer';

const rootReducer = combineReducers({
    notes: notesReducer,
    graph: graphReducer,
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;