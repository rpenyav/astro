import api from "./api";
import { User, CreateUser } from "../interfaces/user";

export const getAllUsers = async (
  page: number,
  pageSize: number
): Promise<{ list: User[]; totalElements: number }> => {
  const response = await api.get(`/auth`, {
    params: { page, pageSize },
  });
  return response.data;
};

export const getUserById = async (_id: string): Promise<User> => {
  const response = await api.get<User>(`/auth/${_id}`);
  return response.data;
};

export const createUser = async (user: CreateUser): Promise<User> => {
  const response = await api.post<User>(`/auth/signup`, user);
  return response.data;
};

export const updateUser = async (
  _id: string,
  user: CreateUser
): Promise<User> => {
  const response = await api.put<User>(`/auth/${_id}`, user);
  return response.data;
};

export const deleteUser = async (_id: string) => {
  const response = await api.delete(`/auth/${_id}`);
  return response.data;
};
