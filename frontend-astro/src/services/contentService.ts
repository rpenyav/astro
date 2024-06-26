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
