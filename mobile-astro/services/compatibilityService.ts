// src/services/compatibilityService.ts
import api from "./api";
import { Compatibility } from "../interfaces/compatibility";

export const getCompatibilitiesBySign = async (
  signCode: string,
  page: number,
  pageSize: number
): Promise<{ list: Compatibility[]; totalElements: number }> => {
  try {
    const response = await api.post(
      "/compatibilities/search",
      { signCode },
      {
        params: {
          page,
          pageSize,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching compatibilities:", error);
    throw error;
  }
};
export const fetchContentById = async (id: string): Promise<Compatibility> => {
  try {
    const response = await api.get(`/compatibilities/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching compatibilities with id ${id}:`, error);
    throw error;
  }
};
