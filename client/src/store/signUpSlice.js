import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../utils/customFetch";
import { fetchuser } from "./userSlice";

export const createUser = createAsyncThunk(
  "signUpSlice/createUser",
  async (data,thunkAPI) => {
    const response = await customFetch("users/signup", "POST", data);
    if (response.success) {
      thunkAPI.dispatch(fetchuser({email: data.email, username: data.username, password: data.password}))
    } 
    return response;
  }
);

export const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState: {
    loading: false,
    error: null,
    isSignedUp: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.isSignedUp = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error.message;
      });
  },
});

export const signUpReducer = signUpSlice.reducer;
// export const { } = signUpSlice.actions;
