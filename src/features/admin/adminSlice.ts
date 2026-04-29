import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies } from "./adminThunk";
import type { CarouselItem } from "@shared/ui/ui.types";

interface AdminState {
  list: CarouselItem[];
  loading: boolean;
}

const initialState: AdminState = {
  list: [],
  loading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const adminReducer = adminSlice.reducer;
export const adminActions = adminSlice.actions;