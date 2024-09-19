import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../types/api";
import { getCurrentUser, login, logout, signup } from "./request";

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation<
    User,
    Error,
    { name: string; username: string; email: string; password: string }
  >({
    mutationFn: ({ name, username, email, password }) =>
      signup(name, username, email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["signup"] });
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, { username: string; password: string }>({
    mutationFn: ({ username, password }) => login(username, password),
    onSuccess: (user) => {
      queryClient.setQueryData(["currentUser"], user);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
    },
  });
};

export const useCurrentUser = () => {
  return useQuery<User | null, Error>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
};
