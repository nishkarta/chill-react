import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNewReleaseList
} from "@shared/services/newRelease.service";

export const fetchMovies = createAsyncThunk(
  "home/fetchMovies",
  async () => {
    return await getNewReleaseList();
  }
);
