// services/contentService.ts
import { Content } from "../interfaces/content";
import api from "./api";

export const fetchContents = async (page: number, pageSize: number) => {
  try {
    const response = await api.get("/contents", {
      params: { page, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching contents:", error);
    throw error;
  }
};

export const fetchContentById = async (id: string): Promise<Content> => {
  try {
    const response = await api.get(`/contents/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching content with id ${id}:`, error);
    throw error;
  }
};
