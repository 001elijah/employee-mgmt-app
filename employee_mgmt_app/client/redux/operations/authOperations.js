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

      const userRole = userData.role_id;

      const alertMessage1 =
        "Your account has been created! You may proceed to login now.";

      const alertMessage2 =
        "An e-mail with a password for the new account has been sent to the employee.";

      if (userRole === 3) {
        Alert.alert("Registration successful", alertMessage1);
      } else if (userRole === 1 || userRole === 2) {
        Alert.alert("Account has been created!", alertMessage2);
      }

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
