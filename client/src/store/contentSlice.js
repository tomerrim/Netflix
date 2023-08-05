import { createSlice } from "@reduxjs/toolkit";

export const contentSlice = createSlice({
    name: "contentSlice",
    initialState: {
        content: [],
        movies: [],
        series: [],
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
        }
    }
});

export const contentReducer = contentSlice.reducer;
export const { setContent, setSingleContent, setMovies, setSeries } = contentSlice.actions;