import { useMutation } from 'react-query';

import useAxios from './useAxios';

export const useActuate = () => {
  const axios = useAxios();

  const actuate = async () => {
    try {
      const { data } = await axios.post(`/api/rpc/oneway/b9a73e30-fa4b-11ed-993d-8d74c2abdddd`, {
        method: 'actuate',
        params: {},
        timeout: 20000,
      });
      return data;
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  };

  const { mutateAsync } = useMutation([`alarms-actuate`], actuate, {
    onError: error => console.log('Query Error:', error),
  });

  return mutateAsync;
};
