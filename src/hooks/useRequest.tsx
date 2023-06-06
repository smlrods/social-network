import { useQuery } from "@tanstack/react-query";
import api from "../api";

function useRequest() {
  return useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const { requests } = await api.requests.getRequests();
      return { requests };
    }
  })
}

export default useRequest;
