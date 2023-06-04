import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import useGetDevices from '../hooks/useGetDevices';
import PlantCard from '../components/PlantCard';
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
  const { data: devicesData } = useGetDevices();
  const axios = useAxios();
  const [timePeriod, setTimePeriod] = useState<number>(7);

  return (
    <>
      {devicesData && (
        <div>
          <div className="plant-text">My plants</div>
          <div className="plants-box">
            {devicesData.map((device, index) => (
              <PlantCard key={index} dataD={device} plantName={device.additionalInfo.description} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
