import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import useGetDevices from '../hooks/useGetDevices';

interface Device {
  id: {
    entityType: string;
    id: string;
  };
}

interface TelemetryData {
  [key: string]: any;
}

interface MyFlowersProps {
  devices: Device[];
}

const MyFlowers: React.FC = () => {
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);
  const { data: devicesData, refetch: refetchDevices } = useGetDevices();
  const axios = useAxios()


  useEffect(() => {
    const fetchData = async () => {
      const telemetryPromises = devicesData.map(async (device : any) => {
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
  }, [axios, devicesData]);
  return (
    <div>
      {telemetryData.map((data, index) => (
        <div key={index}>
          <h3>Telemetry Data for Device {devicesData[0].name}</h3>
          <ul>
            {Object.entries(data).map(([key, value]) => (
              <li key={key}>
                {key}: {JSON.stringify(value)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyFlowers;
