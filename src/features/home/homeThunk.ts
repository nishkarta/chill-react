import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNewReleaseList,
  type GetAllSeriesProps
} from "@shared/services/newRelease.service";

export const fetchMovies = createAsyncThunk(
  "home/fetchMovies",
  async (params?:GetAllSeriesProps) => {
    return await getNewReleaseList(params);
  }
);
