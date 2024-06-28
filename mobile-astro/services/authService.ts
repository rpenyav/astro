import api from "./api";
import { User } from "../interfaces/user";
import axios from "axios";
import { API_URL } from "@env";

const publicApi = axios.create({
  baseURL: API_URL,
});

export const fetchUserData = async (userId: string): Promise<User> => {
  const response = await api.get<User>(`/auth/${userId}`);
  return response.data;
};

export const register = async (
  name: string,
  email: string,
  password: string,
  birthDate: string,
  zodiacSign: string
) => {
  const response = await publicApi.post(`/auth/signup`, {
    name,
    email,
    password,
    birthDate,
    zodiacSign,
  });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await publicApi.post(`/auth/login`, {
    email,
    password,
  });
  return response.data;
};
