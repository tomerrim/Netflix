import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../utils/customFetch";

export const getAllContent = createAsyncThunk("contentSlice/getAllContent", async (data,headers) => {
    const allContent = await customFetch("content", "GET", data, headers);
    return allContent;
})

export const contentSlice = createSlice({
    name: "contentSlice",
    initialState: {
        content: [],
        movies: [],
        series: [],
        actionContent: [],
        contentForKids: [],
        singleContent: null,
    },
    reducers: {
        setSingleContent(state, action) {
            state.singleContent = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllContent.fulfilled, (state, action) => {
            state.content = action.payload;
            state.movies = action.payload.filter(content => content.isSeries === false);
            state.series = action.payload.filter(content => content.isSeries === true);
            state.actionContent = action.payload.filter(content => content.genre === "Action");
            state.contentForKids = action.payload.filter(content => Number(content.limit) <= 12);
        })
    }
});

export const contentReducer = contentSlice.reducer;
export const { setSingleContent } = contentSlice.actions;