import api from "./api";

export const getCompatibilitiesBySign = async (
  signCode: string,
  page: number,
  pageSize: number
) => {
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
