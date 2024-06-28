import api from "./api";
import { Prediction } from "../interfaces/prediction";

export const getHoroscopeBySignCode = async (
  signCode: string
): Promise<{
  daily: Prediction | null;
  weekly: Prediction | null;
  monthly: Prediction | null;
}> => {
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
      daily: dailyResponse.data || null,
      weekly: weeklyResponse.data || null,
      monthly: monthlyResponse.data || null,
    };
  } catch (error) {
    console.error("Error fetching horoscope:", error);
    throw error;
  }
};
