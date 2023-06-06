import { useQuery } from "@tanstack/react-query";
import api from "../api";

function useUser(userid: string | undefined) {
  return useQuery({
    queryKey: ["user", userid],
    queryFn: async () => {
      if (userid) {
        const data = await api.users.getUser(userid);
        return data;
      }
    }
  })
}

export default useUser;
