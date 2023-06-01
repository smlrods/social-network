import { axiosInstance } from ".";

export interface UserProps {
  username: string,
  profile_image?: string,
  first_name: string,
  last_name: string,
  password: string,
} 

const signup = async (user: UserProps) => {
  const { data } = await axiosInstance.post('/auth/signup', { ...user });
  return data;
}

const login = async (user: { username: string, password: string }) => {
  const res = await axiosInstance.post('/auth/login', { ...user }, {
    validateStatus: (status) => {
      return status >= 200 && status <= 302;
    }
  });
  return res;
}

const logout = async () => {
  const { data } = await axiosInstance.post('/auth/logout');
  return data;
}

const getUser = async () => {
  const res = await axiosInstance.get('/auth/login', {
    validateStatus: (status) => {
      return status === 200 || status === 401;
    }
  });
  return res;
}

export default {
  signup,
  login,
  logout,
  getUser,
}
