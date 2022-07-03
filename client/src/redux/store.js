import { combineReducers, applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import loadingReducer from './reducers/loadingReducers';
import messageReducer from './reducers/messageReducers';
import groupReducers from './reducers/groupReducers';
import assignmentReducer from './reducers/assignmentReducers';

const reducer = combineReducers({
    loading: loadingReducer,
    messages: messageReducer,
    groups: groupReducers,
    assignments: assignmentReducer
});

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;