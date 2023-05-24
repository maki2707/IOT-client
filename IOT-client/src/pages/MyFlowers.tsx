import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import useGetDevices from '../hooks/useGetDevices';
import PlantCard from '../components/PlantCard';
import { log } from 'console';
import { Input } from 'antd';

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

export const MyFlowers = () => {
  const [telemetryData, setTelemetryData] = useState<PlantData[]>([]);
  const { data: devicesData } = useGetDevices();
  const axios = useAxios();
  const [timePeriod, setTimePeriod] = useState<number>(7);

  useEffect(() => {
    if (devicesData) {
      const fetchData = async () => {
        const telemetryPromises = devicesData.map(async device => {
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
        setTelemetryData(telemetryResults.filter(data => data !== null));
      };

      fetchData();
    }
  }, [devicesData]);
  console.log('tel', telemetryData);

  return (
    <>
      {telemetryData && (
        <div>
          <div className="login-text">- My plants -</div>
          {devicesData &&
            telemetryData.map((data, index) => (
              <div key={index} className="plants-box">
                <PlantCard
                  plantData={data}
                  plantName={devicesData[index].additionalInfo.description}
                />
                <PlantCard
                  plantData={data}
                  plantName={devicesData[index].additionalInfo.description}
                />
                <PlantCard
                  plantData={data}
                  plantName={devicesData[index].additionalInfo.description}
                />
              </div>
            ))}
        </div>
      )}
      <div className="average-title">
        - work in progress -<div>---average data in the last 7 days + graph?</div>
        <div>---floorplan - already did some testing</div>
      </div>
    </>
  );
};
