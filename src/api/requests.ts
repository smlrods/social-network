import { axiosInstance } from ".";

const getRequests = async () => {
  const { data } = await axiosInstance.get('/requests');
  return data;
}

const updateRequest = async (requestid: string, status = 'accepted') => {
  const { data } = await axiosInstance.put(`/requests/${requestid}`, { status });
  return data;
}

const getSentRequests = async () => {
  const { data } = await axiosInstance.get('/requests/sent');
  return data;
}

const deleteSentRequest = async (requestid: string) => {
  const { data } = await axiosInstance.delete(`/requests/sent/${requestid}`);
  return data;
}

export default {
  getRequests,
  updateRequest,
  getSentRequests,
  deleteSentRequest,
}
