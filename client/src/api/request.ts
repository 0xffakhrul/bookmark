import axios from "axios";
import { User } from "../types/api";

const BASE_URL = "http://localhost:5000/api";

// axios.defaults.withCredentials = true;

export const signup = async (
  name: string,
  username: string,
  email: string,
  password: string
): Promise<User> => {
  const response = await axios.post(`${BASE_URL}/auth/signup`, {
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
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    username,
    password,
  });

  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await axios.get(`${BASE_URL}/auth/me`, {
    withCredentials: true,
  });
  return response.data;
};
