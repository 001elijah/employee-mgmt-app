import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  registerUserApi,
  loginUserApi,
  currentUserApi,
  updateUserApi,
} from "../../services/backendAPI";

import { Alert } from "react-native";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(userData);

      Alert.alert(
        "Registration successful",
        "Your account has been created! You may proceed to login now.",
      );

      return data;
    } catch (error) {
      const { status } = error.response.request;

      if (status === 409) {
        Alert.alert("Message", "This e-mail address is already registered.");
      } else {
        Alert.alert(
          "Message",
          "A problem has occurred, please try again later",
        );
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
      return data;
    } catch (error) {
      const { status } = error.response.request;
      if (status === 404) {
        alert("User not found");
      } else if (status === 400) {
        alert("Wrong password");
      } else {
        Alert.alert(
          "Message",
          "A problem has occurred, please try again later",
        );
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
  async (_, { rejectWithValue }) => {
    try {
      return null;
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message);
    }
  },
);
