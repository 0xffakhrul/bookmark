import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "../types/api";
import { getCurrentUser, login, signup } from "./request";

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });
};

export const useCurrentUser = () => {
  return useQuery<User, Error>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    // onError: (error: Error) => {
    //   console.error('Error fetching current user:', error);
    // }
  });
};
