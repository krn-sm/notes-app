import api from "./api";

export type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type UpdateProfileData = {
  name: string;
};

export const register = async (data: RegisterData): Promise<User> => {
  return api<User>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const login = async (data: LoginData): Promise<void> => {
  return api<void>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getCurrentUser = async (): Promise<User> => {
  return api<User>("/api/auth/me");
};

export const updateProfile = async (
  data: UpdateProfileData,
): Promise<User> => {
  return api<User>("/api/auth/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const logout = async (): Promise<void> => {
  return api<void>("/api/auth/logout", {
    method: "POST",
  });
};
