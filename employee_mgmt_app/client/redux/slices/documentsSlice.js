import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDocumentsApi } from "../../services/backendAPI";

export const fetchDocuments = createAsyncThunk(
  "fetchDocuments",
  async (userId) => {
    const data = await fetchDocumentsApi(userId);
    return data;
  },
);

const documentSlice = createSlice({
  name: "document",
  initialState: {
    documents: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDocuments.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchDocuments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.documents = action.payload;
    });

    builder.addCase(fetchDocuments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default documentSlice.reducer;
