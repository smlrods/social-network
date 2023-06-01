import { axiosInstance } from ".";

const getComments = async () => {
  const { data } = await axiosInstance.get('/comments');
  return data;
}

const deleteComment = async (commentid: string) => {
  const { data } = await axiosInstance.delete(`/comments/${commentid}`);
  return data;
}

export default {
  getComments,
  deleteComment,
}
