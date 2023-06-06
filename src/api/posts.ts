import { axiosInstance } from ".";

const getPosts = async (lastDoc?: string) => {
  const { data } = await axiosInstance.get('/posts', {
    data: {
      ...(lastDoc && { lastDoc })
    }
  });
  return data;
}

const createPost = async (post: { body: string, image?: string }) => {
  const { data } = await axiosInstance.post('/posts', post);
  return data;
}

const getPost = async (postid: string) => {
  const { data } = await axiosInstance.get(`/posts/${postid}`);
  return data;
}

const deletePost = async (postid: string) => {
  const { data } = await axiosInstance.delete(`/posts/${postid}`);
  return data;
}

const updatePost = async (postid: string, post: { body: string }) => {
  const { data } = await axiosInstance.put(`/posts/${postid}`, post);
  return data;
}

const getComments = async (postid: string, lastDoc?: string) => {
  const { data } = await axiosInstance.get(`/posts/${postid}/comments`, {
    data: {
      ...(lastDoc && { lastDoc })
    }
  });
  return data;
}

const createComment = async (postid: string, comment: { body: string }) => {
  const { data } = await axiosInstance.post(`/posts/${postid}/comments`, comment);
  return data;
}

const getLikes = async (postid: string) => {
  const { data } = await axiosInstance.get(`/posts/${postid}/likes`);
  return data;
}

const createLike = async (postid: string) => {
  const { data } = await axiosInstance.post(`/posts/${postid}/likes`);
  return data;
}

export default {
  getPosts,
  createPost,
  getPost,
  deletePost,
  updatePost,
  getComments,
  getLikes,
  createComment,
  createLike,
};
