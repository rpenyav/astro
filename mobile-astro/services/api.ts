import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
