import { useQuery } from 'react-query';
import useAxios from './useAxios';

export const useGetUser = () => {
  const axios = useAxios();

  const getUser = async () => {
    try {
      const { data } = await axios.get(`/api/auth/user`);
      localStorage.setItem('customerId', data.customerId.id);
      return data;
    } catch (error) {
      console.log('User data:', error);
    }
    return;
  };
  return useQuery(['userData'], () => getUser(), {
    onError: error => console.log(error),
    staleTime: Infinity,
  });
};

export default useGetUser;
