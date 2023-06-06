import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../api";

function usePostsUser(userid: string) {
  return useInfiniteQuery({
    queryKey: ["postsUser", userid],
    queryFn: ({ pageParam = null }) => api.users.getPosts(userid, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.lastDoc : undefined;
    }
  })
}

export default usePostsUser;
