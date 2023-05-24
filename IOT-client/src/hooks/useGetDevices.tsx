import { useQuery } from 'react-query';

import useAxios from './useAxios';

export const useGetDevices = () => {
  const axios = useAxios();
  const customer = localStorage.getItem('customerId');

  const getDevices = async () => {
    try {
      const { data } = await axios.get(`/api/customer/${customer}/devices?pageSize=10&page=0`);
      return data.data;
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  };

  return useQuery(['devicesData'], () => getDevices(), {
    onError: error => console.log('Query Error:', error),
    staleTime: Infinity,
  });
};

export default useGetDevices;
