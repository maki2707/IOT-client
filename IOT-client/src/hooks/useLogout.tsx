import { useMutation } from 'react-query';
import useAxios from './useAxios';

export const useLogout = () => {
  const axios = useAxios();

  const logout = async () => {
    return await axios.post(`/api/auth/logout`);
  };

  return useMutation(logout, {
    onError: (error) => console.log(error),
  });
};