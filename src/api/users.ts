import { axiosInstance } from ".";

const getUsers = async (lastDoc?: string) => {
  const { data } = await axiosInstance.get('/users', {
    data: { 
      ...(lastDoc && { lastDoc }), 
    }
  });
  return data;
}

const getUser = async (userid: string) => {
  const { data } = await axiosInstance.get(`/users/${userid}`);
  return data;
}

const sendRequest = async (userid: string) => {
  const { data } = await axiosInstance.post(`/users/${userid}/request`);
  return data;
}

const getRequestStatus = async (userid: string) => {
  const { data } = await axiosInstance.get(`/users/${userid}/request`);
  return data;
}

const getPosts = async (userid: string, lastDoc?: string) => {
  const { data } = await axiosInstance.get(`/users/${userid}/posts`, { 
    data: {
      ...(lastDoc && { lastDoc }),
    } 
  });
  return data;
}

const getFriends = async (userid: string, lastDoc?: string) => {
  const { data } = await axiosInstance.get(`/users/${userid}/friends`, {
    data: {
      ...(lastDoc && { lastDoc }),
    } 
  });
  return data;
}

export default {
  getUsers,
  getUser,
  sendRequest,
  getRequestStatus,
  getPosts,
  getFriends,
}
