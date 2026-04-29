import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNewReleaseList,
  deleteNewRelease,
  createNewRelease,
  updateNewRelease,
} from "@shared/services/newRelease.service";
import type { CarouselItem } from "@shared/ui/ui.types";

export const fetchMovies = createAsyncThunk(
  "admin/fetchMovies",
  async () => {
    return await getNewReleaseList();
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
  async (payload: Omit<CarouselItem, "id" | "thumbnailFile">, { dispatch }) => {
    await createNewRelease(payload);
    dispatch(fetchMovies());
  }
);

export const updateMovie = createAsyncThunk(
  "admin/updateMovie",
  async ({
    id,
    payload,
  }: {
    id: string;
    payload: Omit<CarouselItem, "id" | "thumbnailFile">;
  }, { dispatch }) => {
    await updateNewRelease(id, payload);
    dispatch(fetchMovies());
  }
);