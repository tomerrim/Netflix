import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { contentReducer } from "./contentSlice";
import { userReducer } from "./userSlice";
import { signUpReducer } from "./signUpSlice";

const rootReducer = combineReducers({
    contentSlice: contentReducer,
    userSlice: userReducer,
    signUpSlice: signUpReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export { store };