import axios from "axios";
import { Bookmark, BookmarkInput, User } from "../types/api";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const signup = async (
  name: string,
  username: string,
  email: string,
  password: string
): Promise<User> => {
  const response = await axiosInstance.post(`/auth/signup`, {
    name,
    username,
    email,
    password,
  });
  return response.data;
};

export const login = async (
  username: string,
  password: string
): Promise<User> => {
  const response = await axiosInstance.post(`/auth/login`, {
    username,
    password,
  });

  return response.data;
};

export const logout = async (): Promise<User> => {
  const response = await axiosInstance.post(`/auth/logout`);

  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get(`/auth/me`);
  return response.data;
};

export const createBookmark = async (
  bookmark: BookmarkInput
): Promise<Bookmark> => {
  const response = await axiosInstance.post("/bookmarks", bookmark);
  return response.data;
};

export const getBookmarks = async (): Promise<Bookmark[]> => {
  const response = await axiosInstance.get("/bookmarks");
  return response.data;
};
