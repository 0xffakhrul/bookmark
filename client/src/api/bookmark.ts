import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookmark, BookmarkInput } from "../types/api";
import { createBookmark, getBookmarks } from "./request";

export const useGetBookmarks = () => {
  return useQuery<Bookmark[], Error>({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
  });
};

export const useCreateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<Bookmark, Error, BookmarkInput>({
    mutationFn: createBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmark"] });
    },
  });
};
