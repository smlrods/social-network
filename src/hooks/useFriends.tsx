import { useQuery } from "@tanstack/react-query";
import api from "../api";

function useFriends(userid: string | undefined) {
  return useQuery({
    queryKey: ["friends", userid],
    queryFn: async () => {
      if (userid) {
        const data = await api.users.getFriends(userid);
        return data;
      }
    }
  })
}

export default useFriends;
