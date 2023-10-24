import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTimesApi, registerTimeApi } from "../../services/backendAPI";

export const fetchTimes = createAsyncThunk("fetchTimes", async (userId) => {
  const data = await fetchTimesApi(userId);
  return data;
});

export const registerTime = createAsyncThunk(
  "registerTime",
  async (timeData) => {
    const data = await registerTimeApi(timeData);
    return data;
  },
);

const timeSlice = createSlice({
  name: "time",
  initialState: {
    isLoading: false,
    times: [],
    isClockedIn: false,
    clockInReadable: null,
    error: null,
  },
  reducers: {
    SetClockIn: (state, action) => {
      state.isClockedIn = action.payload;
    },
    SetClockInReadable: (state, action) => {
      state.clockInReadable = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTimes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTimes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.times = action.payload;
      })
      .addCase(fetchTimes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerTime.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerTime.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.times.findIndex(
          (time) => time.id === action.payload.id,
        );
        state.times[index] = action.payload;
      })
      .addCase(registerTime.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { SetClockIn } = timeSlice.actions;

export default timeSlice.reducer;
