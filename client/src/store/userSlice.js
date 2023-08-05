import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../utils/customFetch";

export const fetchuser = createAsyncThunk("userSlice/fetchUser", async (data) => {
    if (data.email && data.password) {
        return await customFetch("users/signin", "POST", data);
    } else {
        console.log("Failed fetch user")
        // throw new Error('Please enter email and password');
    }
})

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isLoggedIn: false,
    token: null,
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
            state.token = action.payload.token;
        })
        .addCase(fetchuser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error.message;
        })
  }
});

export const userReducer = userSlice.reducer;
export const { setUser, signOut } = userSlice.actions;
