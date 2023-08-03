import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { contentReducer } from "./contentSlice";
import { userReducer } from "./userSlice";

const rootReducer = combineReducers({
    contentSlice: contentReducer,
    userSlice: userReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export { store };