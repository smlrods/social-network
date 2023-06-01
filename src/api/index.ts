import axios from "axios";

import auth from "./auth";
import comments from "./comments";
import posts from "./posts";
import users from "./users";
import likes from "./likes";
import friends from "./friends";
import requests from "./requests";

const API_URL = 'https://social-network-api.fly.dev/';
// const API_URL = 'http://localhost:3000/';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default {
  auth,
  comments,
  posts,
  users,
  likes,
  friends,
  requests,
}
