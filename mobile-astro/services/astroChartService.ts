// services/astroChartService.ts
import api from "./api";
import { AstroChart } from "../interfaces/astrochart";

export const fetchAstroCharts = async (
  userId: string,
  page: number,
  pageSize: number
) => {
  try {
    const response = await api.get(`/astro-charts/user/${userId}`, {
      params: { page, pageSize },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch astro charts:", error);
    throw error;
  }
};

export const fetchAstroChartById = async (id: string): Promise<AstroChart> => {
  try {
    const response = await api.get(`/astro-charts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch astro chart with id ${id}:`, error);
    throw error;
  }
};

export const fetchUserName = async (userId: string) => {
  try {
    const response = await api.get(`/auth/${userId}`);
    return response.data.name;
  } catch (error) {
    console.error(`Failed to fetch user name for ID: ${userId}`, error);
    throw error;
  }
};

export const fetchAllUsers = async (): Promise<
  { _id: string; name: string }[]
> => {
  try {
    const response = await api.get(`/auth`);
    return Array.isArray(response.data.list) ? response.data.list : [];
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};
