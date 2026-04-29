import { fetchMovies } from "@features/home/homeThunk";
import { createSlice } from "@reduxjs/toolkit";
import type { CarouselItem } from "@shared/ui/ui.types";

interface HomeState {
  list: CarouselItem[];
  loading: boolean;
}

const initialState: HomeState = {
  list: [],
  loading: false,
};

const homeSlice = createSlice({
  name: "home",
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

export const homeReducer = homeSlice.reducer;
export const homeActions = homeSlice.actions;