import { useQuery } from "@tanstack/react-query";
import api from "../api";

function useRequestHeader(userid: string) {
  return useQuery({
    queryKey: ["request", userid],
    queryFn: async () => {
      const requestSent = await api.users.getRequestStatus(userid);
      let amountFriends = (await api.users.getFriends(userid)).friends.length;
      const { requests } = await api.requests.getRequests();
      const requestReceived = requests.find((request: any) => request.user === userid);
      return { requestSent, requestReceived, amountFriends };
    }
  })
}

export default useRequestHeader;
