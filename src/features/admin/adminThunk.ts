import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNewReleaseList,
  deleteNewRelease,
  createNewRelease,
  updateNewRelease,
  type GetAllSeriesProps,
} from "@shared/services/newRelease.service";
import type { CarouselItem } from "@shared/ui/ui.types";
import axios from "axios";

export const fetchMovies = createAsyncThunk(
  "admin/fetchMovies",
  async (params?: GetAllSeriesProps) => {
    return await getNewReleaseList(params);
  }
);

export const removeMovie = createAsyncThunk(
  "admin/removeMovie",
  async (id: string, { dispatch }) => {
    await deleteNewRelease(id);
    dispatch(fetchMovies());
  }
);

export const addMovie = createAsyncThunk(
  "admin/addMovie",
  async (payload: Omit<CarouselItem, "id" | "thumbnail"> & { thumbnailFile: File }, { dispatch, rejectWithValue }) => {
    try {
      await createNewRelease(payload);
      dispatch(fetchMovies());
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data);
      }
      return rejectWithValue({ error: "System runtime exception" });
    }
  }
);

export const updateMovie = createAsyncThunk(
  "admin/updateMovie",
  async ({
    id,
    payload,
  }: {
    id: string;
    payload: Omit<CarouselItem, "id" | "thumbnail">;
  }, { dispatch, rejectWithValue }) => {
    try {
      await updateNewRelease(id, payload);
      dispatch(fetchMovies())
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Pass the backend error structure back down to the unwrap block
        return rejectWithValue(err.response?.data);
      }
      return rejectWithValue({ error: "System runtime exception" });
    }
    ;
  }
);