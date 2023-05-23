import { useMutation } from 'react-query';
import useAxios from './useAxios';
import { userCredentials } from '../types/userCredentials';
import queryClient from '../util/queryClients';

export const useLogin = () => {
  const axios = useAxios();

  const login = async (data: userCredentials) => {
    queryClient.invalidateQueries('userData')
    return await axios.post(`/api/auth/login`, data);
  };

  return useMutation(login, {
    onError: (error) => console.log(error),
  });
};