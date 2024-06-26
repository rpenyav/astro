// src/services/horoscopeService.ts
import api from "./api";

export const getHoroscopeBySignCode = async (
  signCode: string
): Promise<any> => {
  try {
    const today = new Date();
    const todayDateOnly = today.toLocaleDateString("en-CA"); // Formato YYYY-MM-DD según la zona horaria local
    const month = today.getMonth() + 1; // Mes en formato 1-12

    const dailyResponse = await api.get(`/horoscopes/daily`, {
      params: { signCode, date: todayDateOnly },
    });
    const weeklyResponse = await api.get(`/horoscopes/weekly`, {
      params: { signCode, date: todayDateOnly },
    });
    const monthlyResponse = await api.get(`/horoscopes/monthly`, {
      params: { signCode, month },
    });

    return {
      daily: dailyResponse.data.prediction,
      weekly: weeklyResponse.data.prediction,
      monthly: monthlyResponse.data.prediction,
    };
  } catch (error) {
    console.error("Error fetching horoscope:", error);
    throw error;
  }
};

export const getAllHoroscopes = async (
  type: string,
  page: number,
  pageSize: number
): Promise<{ list: any[]; totalElements: number }> => {
  const response = await api.get(`/horoscopes/all-${type}`, {
    params: { page, pageSize },
  });
  return response.data;
};

export const createHoroscope = async (type: string, horoscope: any) => {
  const response = await api.post(`/horoscopes/${type}`, horoscope);
  return response.data;
};

export const updateHoroscope = async (id: string, horoscope: any) => {
  const response = await api.put(`/horoscopes/${id}`, horoscope);
  return response.data;
};

export const deleteHoroscope = async (id: string) => {
  const response = await api.delete(`/horoscopes/${id}`);
  return response.data;
};
