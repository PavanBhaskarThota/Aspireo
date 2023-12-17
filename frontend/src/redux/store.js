import { applyMiddleware, combineReducers, legacy_createStore } from "redux";

import { thunk } from "redux-thunk";
import adminReducer from "./adminReducer/reducer"

const rootReducer = combineReducers({
admin:adminReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
