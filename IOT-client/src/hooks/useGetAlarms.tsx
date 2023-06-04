import { useQuery } from 'react-query';

import useAxios from './useAxios';
import { PaginationType } from '../pages';

export const useGetAlarms = (pagination: PaginationType) => {
  const axios = useAxios();

  const getDevices = async (pagination: PaginationType) => {
    try {
      const { data } = await axios.get(`/api/alarms`, {
        params: {
          ...pagination,
          sortProperty: 'createdTime',
          sortOrder: 'DESC',
          fetchOriginator: true,
        },
      });
      return data;
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  };

  return useQuery(
    [`alarms-${pagination.page}-${pagination.pageSize}`],
    () => getDevices(pagination),
    {
      onError: error => console.log('Query Error:', error),
    }
  );
};
