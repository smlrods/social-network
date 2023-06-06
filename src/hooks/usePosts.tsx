import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../api";

function usePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = null }) => api.friends.getPosts(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.lastDoc : undefined;
    }
  })
}

export default usePosts;
