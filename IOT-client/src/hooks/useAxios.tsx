import axios, { AxiosError, AxiosInstance } from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

const useAxios = (): AxiosInstance => {
  const { user, setUser } = useContext(UserContext)!;

  const instance = axios.create({
    baseURL: 'http://161.53.19.19:45080/',
  });

  instance.interceptors.request.use(config => {
    config.headers['X-Authorization'] = `Bearer ${user.token}`;
    return config;
  });

  instance.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        setUser({ token: '', refreshToken: '', name: '', customerId: '' });
        localStorage.removeItem('user');
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxios;
