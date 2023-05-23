import axios, { AxiosInstance } from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/userContext'

const useAxios = (): AxiosInstance => {
  const { user } = useContext(UserContext)!;

  const instance = axios.create({
    baseURL: 'http://161.53.19.19:45080/',
  });

 
  instance.interceptors.request.use((config) => {
    config.headers['X-Authorization'] = `Bearer ${user.token}`;
    return config;
  });

  return instance;
};

export default useAxios;
