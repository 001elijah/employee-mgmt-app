import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  currentUser,
  logoutUser,
  updateUser,
} from "../operations/authOperations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    username: null,
    email: null,
    role_id: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          ...payload,
        };
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          ...payload,
        };
      })
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          ...payload,
        };
      })
      .addCase(logoutUser.fulfilled, () => {
        return {
          token: null,
          username: null,
          email: null,
          error: null,
        };
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          ...payload,
        };
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("auth") && action.type.endsWith("/fulfilled"),
        (state) => {
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("auth") && action.type.endsWith("/pending"),
        (state) => {
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("auth") && action.type.endsWith("/rejected"),
        (state, { payload }) => {
          state.error = payload;
        },
      );
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
