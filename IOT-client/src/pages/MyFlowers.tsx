import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import useGetDevices from '../hooks/useGetDevices';
import PlantCard from '../components/PlantCard';

interface Device {
  id: {
    entityType: string;
    id: string;
  };
}

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

const MyFlowers: React.FC = () => {
  const [telemetryData, setTelemetryData] = useState<PlantData[]>([]);
  const { data: devicesData, refetch: refetchDevices } = useGetDevices();
  const axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      const telemetryPromises = devicesData.map(async (device: Device) => {
        const url = `http://161.53.19.19:45080/api/plugins/telemetry/${device.id.entityType}/${device.id.id}/values/timeseries`;
        try {
          const response = await axios.get(url);
          return response.data;
        } catch (error) {
          console.log('Error fetching telemetry data:', error);
          return null;
        }
      });

      const telemetryResults = await Promise.all(telemetryPromises);
      setTelemetryData(telemetryResults.filter((data) => data !== null));
    };

    fetchData();
  }, []);

  return (
    <div>
      {telemetryData.map((data, index) => (
        <PlantCard key={index} plantData={data} />
      ))}
    </div>
  );
};

export default MyFlowers;
