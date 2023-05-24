import { useQuery } from 'react-query';

import useAxios from './useAxios';
import { Alarm } from '../types/Alarm';

export const useGetAlarms = () => {
  const axios = useAxios();

  const getDevices = async (): Promise<Alarm[]> => {
    try {
      const { data } = await axios.get(`/api/alarms?pageSize=10&page=0`);
      return data.data;
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  };

  return useQuery(['alarms'], () => getDevices(), {
    onError: error => console.log('Query Error:', error),
    staleTime: Infinity,
  });
};
