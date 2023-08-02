import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { contentReducer } from "./contentSlice";

const rootReducer = combineReducers({
    contentSlice: contentReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export { store };