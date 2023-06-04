import { useQuery } from 'react-query';
import useAxios from './useAxios';
import { PlantDevice } from '../types/PlantDevice';

type SingleData = {
  ts: number;
  value: string;
};

type PlantData = {
  temp_ground: SingleData[];
  hum_ground: SingleData[];
  cond_ground: SingleData[];
  temp_air: SingleData[];
  hum_air: SingleData[];
};

export const useGetPlantTelemetry = (device: PlantDevice) => {
  const axios = useAxios();

  const getPlantTelemetry = async (): Promise<PlantData> => {
    try {
      const { data } = await axios.get(
        `/api/plugins/telemetry/${device.id.entityType}/${device.id.id}/values/timeseries`
      );

      return data;
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  };

  return useQuery(['plantData', device.id.id], getPlantTelemetry, {
    onError: error => console.log('Query Error:', error),
    staleTime: 2 * 60 * 1000, // 2 minutes in milliseconds
  });
};
