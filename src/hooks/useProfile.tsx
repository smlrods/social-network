import { useQuery } from "@tanstack/react-query";
import api from "../api";

function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await api.auth.getUser();
      return data;
    }
  })
}

export default useProfile;
