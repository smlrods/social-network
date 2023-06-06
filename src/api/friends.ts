import { axiosInstance } from ".";

const getFriends = async (lastDoc?: string) => {
  const { data } = await axiosInstance.get('/friends', {
    data: {
      ...(lastDoc && { lastDoc })
    }
  });
  return data;
}

const getPosts = async (lastDoc?: string) => {
  const { data } = await axiosInstance.get('/friends/posts', {
    params: {
      ...(lastDoc && { lastDoc })
    }
  });
  return data;
}

export default {
  getFriends,
  getPosts,
}
