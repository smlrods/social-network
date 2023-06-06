import { useQuery } from "@tanstack/react-query";
import api from "../api/";

function useComments(postid: string) {
  return useQuery({
    queryKey: ["comments", postid],
    queryFn: async () => {
      const data = await api.posts.getComments(postid);
      return data;
    }
  })
}

export default useComments;
