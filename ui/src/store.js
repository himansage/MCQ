import {applyMiddleware, createStore} from 'redux'
import rootReducer from './reducers/index';
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

const initialState = {};
const middlewares = [thunk];

const store = createStore( rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;