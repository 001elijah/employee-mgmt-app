import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  registerUserApi,
  loginUserApi,
  logoutUserApi,
  currentUserApi,
  updateUserApi,
} from "../../services/backendAPI";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(userData);
      alert("You may proceed to login now");
      return data;
    } catch (error) {
      const { status } = error.response.request;

      if (status === 409) {
        alert("Email already exists");
      } else if (status === 400) {
        alert(`Error`);
      } else if (status === 500) {
        alert("Server error");
      }
      return rejectWithValue(error.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(userData);
      alert("Welcome");
      return data;
    } catch (error) {
      const { status } = error.response.request;
      if (status === 401) {
        alert("Email or password is wrong");
      } else if (status === 400) {
        alert(`Error`);
      } else if (status === 500) {
        alert("Server error");
      }

      return rejectWithValue(error.message);
    }
  },
);

export const currentUser = createAsyncThunk(
  "auth/current",
  async (_, { getState, rejectWithValue, dispatch }) => {
    const { token } = getState().auth;
    try {
      const data = await currentUserApi(token);
      return data;
    } catch (error) {
      setTimeout(() => {
        dispatch(logOut());
      }, 0);
      return rejectWithValue(error.message);
    }
  },
  {
    condition(_, { getState }) {
      const { token } = getState().auth;
      return Boolean(token);
    },
  },
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await updateUserApi(userData);
      alert("Successful editing");
      return data;
    } catch (error) {
      alert("Invalid editing");
      return rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (token, { rejectWithValue }) => {
    try {
      await logoutUserApi(token);
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
