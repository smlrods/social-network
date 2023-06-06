import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../api";

function useUsers() {
  return useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam = null }) => api.users.getUsers(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.lastDoc : undefined;
    }
  })
}

export default useUsers;
