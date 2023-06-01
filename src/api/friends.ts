import { axiosInstance } from ".";

const getFriends = async (lastDoc?: string) => {
  const { data } = await axiosInstance.get('/friends', {
    data: {
      ...(lastDoc && { lastDoc })
    }
  });
  return data;
}

const getPosts = async () => {
  const { data } = await axiosInstance.get('/friends/posts');
  return data;
}

export default {
  getFriends,
  getPosts,
}
