import { useQuery } from "@tanstack/react-query";
import api from "../api/";

function useLikes(postid: string) {
  return useQuery({
    queryKey: ["likes", postid],
    queryFn: async () => {
      const data = await api.posts.getLikes(postid);
      return data;
    }
  })
}

export default useLikes;
