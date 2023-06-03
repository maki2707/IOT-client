import { useMutation } from 'react-query';

import useAxios from './useAxios';
import { Alarm } from '../types/Alarm';

export const useSetAlarmAcknowledged = () => {
  const axios = useAxios();

  const setAlarmAcknowledged = async (alarmId: string): Promise<Alarm[]> => {
    try {
      const { data } = await axios.post(`/api/alarm/${alarmId}/ack`);
      return data.data;
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  };

  const { mutateAsync } = useMutation([`alarm-ack`], setAlarmAcknowledged, {
    onError: error => console.log('Query Error:', error),
  });

  return mutateAsync;
};
