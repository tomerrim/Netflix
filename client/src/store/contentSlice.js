import { createSlice } from "@reduxjs/toolkit";

export const contentSlice = createSlice({
    name: "contentSlice",
    initialState: {
        content: null,
    },
    reducers: {
        setContent(state, action) {
            state.content = action.payload;
        },

    }
});

export const contentReducer = contentSlice.reducer;
export const { setContent } = contentSlice.actions;