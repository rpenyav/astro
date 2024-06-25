import api from "./api";

export const getHoroscopeBySign = async (sign: string): Promise<any> => {
  try {
    const searchResponse = await api.get(`/horoscopes/search?sign=${sign}`);
    const horoscopeId = searchResponse.data._id;

    const response = await api.get(`/horoscopes/${horoscopeId}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching horoscope:", error);
    throw error;
  }
};
