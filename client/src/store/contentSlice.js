import { createSlice } from "@reduxjs/toolkit";

export const contentSlice = createSlice({
    name: "contentSlice",
    initialState: {
        content: [],
        singleContent: null,
    },
    reducers: {
        setContent(state, action) {
            state.content = action.payload;
        },
        setSingleContent(state, action) {
            state.singleContent = action.payload;
        }
    }
});

export const contentReducer = contentSlice.reducer;
export const { setContent, setSingleContent } = contentSlice.actions;