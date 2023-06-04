import { useQuery } from 'react-query';
import useAxios from './useAxios';
import { PlantDevice } from '../types/PlantDevice';

export const useGetAvgPlantTelemetry = (device: PlantDevice) => {
  const axios = useAxios();
  const currentTime = new Date().getTime();
  const startTime = currentTime - 25 * 24 * 60 * 60 * 1000;
  const url = `/api/plugins/telemetry/${device.id.entityType}/${device.id.id}/values/timeseries`;

  const getAvgPlantTelemetry = async () => {
    try {
      const response = await axios.get(url, {
        params: {
          entityType: device.id.entityType,
          entityId: device.id.id,
          keys: 'temp_ground,hum_ground,cond_ground,temp_air,hum_air',
          startTs: startTime,
          endTs: currentTime,
          interval: 43200000,
          limit: 1000,
          agg: '',
          orderBy: 'ASC',
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error fetching telemetry data:', error);
      throw error;
    }
  };

  return useQuery(['plantAvgData', device.id.id], getAvgPlantTelemetry, {
    onError: error => console.log('Query Error:', error),
    staleTime: 2 * 60 * 1000, // 2 minutes in milliseconds
  });
};
