import axios from "axios";
import type { CarouselItem } from "@shared/ui/ui.types";
import { API_BASE_URL, getAuthHeader } from "@shared/utils/config";

export interface GetAllSeriesProps {
  search?: string;
  isMovie?: boolean;
  sortBy?: string;
  order?: "ASC" | "DESC";
}


// CREATE NEW
export const createNewRelease = async (
  data: Omit<CarouselItem, "id" | "thumbnail"> & { thumbnailFile: File }
) => {
  const formData = new FormData();
  formData.append("title", data.title || "");
  formData.append("director", data.director || "");
  formData.append("synopsys", data.synopsys || "");
  formData.append("isMovie", "true");

  // Attach the binary image file matching your backend key: upload.single('thumbnail')
  formData.append("thumbnail", data.thumbnailFile);

  const response = await axios.post(`${API_BASE_URL}/series`, formData, {
    headers: {
      ...getAuthHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// FETCH ALL
export const getNewReleaseList = async (params?: GetAllSeriesProps): Promise<CarouselItem[]> => {
  const response = await axios.get(`${API_BASE_URL}/series`, {
    params
  });
  return response.data;
};

// UPDATE ONE
export const updateNewRelease = async (
  id: string,
  data: Partial<Omit<CarouselItem, "thumbnail">> & { thumbnailFile?: File }
) => {
  const formData = new FormData();

  if (data.title) formData.append("title", data.title);
  if (data.director) formData.append("director", data.director);
  if (data.synopsys) formData.append("synopsys", data.synopsys);
  if (data.thumbnailFile) formData.append("thumbnail", data.thumbnailFile);

  const response = await axios.patch(`${API_BASE_URL}/series/${id}`, formData, {
    headers: {
      ...getAuthHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// DELETE ONE
export const deleteNewRelease = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/series/${id}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};