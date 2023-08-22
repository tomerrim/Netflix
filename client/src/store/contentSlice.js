import { createSlice } from "@reduxjs/toolkit";

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
        setContent(state, action) {
            state.content = action.payload;
        },
        setSingleContent(state, action) {
            state.singleContent = action.payload;
        },
        setMovies (state, action) {
            state.movies = action.payload.filter(content => content.isSeries === false);
        },
        setSeries(state, action) {
            state.series = action.payload.filter(content => content.isSeries === true);
        },
        setActionContent(state, action) {
            state.actionContent = action.payload.filter(content => content.genre === "Action");
        },
        setContentForKids(state, action) {
            state.contentForKids = action.payload.filter(content => Number(content.limit) <= 12);
        },
    }
});

export const contentReducer = contentSlice.reducer;
export const { setContent, setSingleContent, setMovies, setSeries, setActionContent, setContentForKids } = contentSlice.actions;