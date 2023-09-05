import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../utils/customFetch";

export const fetchuser = createAsyncThunk("userSlice/fetchUser", async (data, thunkAPI) => {
  try {
    if (data.email && data.password){
      return await customFetch("users/signin", "POST", data);
    } else {
      console.log("Failed fetch user");
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
})

export const toggleFavorite = createAsyncThunk("userSlice/toggleFavorite", async (contentId, thunkAPI) => {
  const token = thunkAPI.getState().userSlice.token;
  const response = await customFetch(
    `users/toggle-favorite/${contentId}`,
    "POST",
    null,
    { Authorization: `Bearer ${token}` }
  );
  return response;
})

export const toggleLike = createAsyncThunk("userSlice/toggleLike", async (contentId, thunkAPI) => {
  const token = thunkAPI.getState().userSlice.token;
  const response = await customFetch(`users/toggle-like/${contentId}`, "POST", null, {Authorization: `Bearer ${token}`});
  return response;
})

export const toggleDislike = createAsyncThunk("userSlice/toggleDislike", async (contentId, thunkAPI) => {
  const token = thunkAPI.getState().userSlice.token;
  const response = await customFetch(`users/toggle-dislike/${contentId}`, "POST", null, { Authorization: `Bearer ${token}` });
  return response;
});

export const toggleWatchList = createAsyncThunk(
  "userSlice/toggleWatchList",
  async ({ contentId, stoppedAt, watchItem, totalDuration }, thunkAPI) => {
    const token = thunkAPI.getState().userSlice.token;
    if (!token) {
      return thunkAPI.rejectWithValue("Token not found");
    }

    const body = JSON.stringify({ contentId, stoppedAt, watchItem, totalDuration });
    try {
      const response = await customFetch(
        `users/toggle-watch/${contentId}`,
        "POST",
        body,
        { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      );
      return response;
    } catch (error) {
      console.error("toggle watch list error: ", error);
      return thunkAPI.rejectWithValue("failed to update watch list");
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    error: null,
    isLoggedIn: false,
    token: localStorage.getItem("token") !== null ? localStorage.getItem("token") : null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    signOut(state) {
        state.user = null;
        state.loading = false;
        state.error = null;
        state.isLoggedIn = false;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },  
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchuser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchuser.fulfilled, (state,action) => {
            state.loading = false;
            state.error = null;
            state.isLoggedIn = true;
            state.user = action.payload.user;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            state.token = action.payload.token;
        })
        .addCase(fetchuser.rejected, (state, action) => {
            state.loading = false;
            state.error = "Wrong Email or Password";
        })
        .addCase(toggleFavorite.fulfilled, (state, action) => {
          state.user.favoritesList = action.payload.favoritesList;
          localStorage.setItem("user", JSON.stringify(state.user));
        })
        .addCase(toggleWatchList.fulfilled, (state, action) => {
          state.user.watchList = action.payload.watchList;
          localStorage.setItem("user", JSON.stringify(state.user));
        })
        .addCase(toggleLike.fulfilled, (state, action) => {
          state.user.likeList = action.payload.likeList;
          localStorage.setItem("user", JSON.stringify(state.user));
        })
        .addCase(toggleDislike.fulfilled, (state, action) =>{
          state.user.dislikeList = action.payload.dislikeList;
          localStorage.setItem("user", JSON.stringify(state.user));
        })
  }
});

export const userReducer = userSlice.reducer;
export const { setUser, signOut } = userSlice.actions;
