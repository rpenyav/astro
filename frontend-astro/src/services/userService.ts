import api from "./api";
import { User } from "../interfaces/user";

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};
