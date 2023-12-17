import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { thunk } from "redux-thunk";

import adminReducer from "./adminReducer/reducer"


import { reducer as userReducer } from "./userReducer/reducer";

import {reducer as taskReducer} from './taskReducer/reducer'

import {reducer as projectReducer} from './projectReducer/reducer'

const rootReducer = combineReducers({
    taskReducer,
    userReducer,
    projectReducer,
    adminReducer

});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
