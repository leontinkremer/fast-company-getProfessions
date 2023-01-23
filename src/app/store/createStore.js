import { combineReducers, configureStore } from "@reduxjs/toolkit";
import professionsReducer from "./professions";
import qualitiesReducer from "./qualities";

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer
});

function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}

export default createStore;
