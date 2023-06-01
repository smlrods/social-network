import { axiosInstance } from ".";

const getLikes = async (lastDoc?: string) => {
  const { data } = await axiosInstance.get('/likes', {
    data: {
      ...(lastDoc && { lastDoc })
    }
  });
  return data;
}

const deleteLike = async (likeid: string) => {
  const { data } = await axiosInstance.delete(`/likes/${likeid}`);
  return data;
}

export default {
  getLikes,
  deleteLike,
}
