import React from 'react';

type PlantData = {
  temp_ground: SingleData[];
  hum_ground: SingleData[];
  cond_ground: SingleData[];
  temp_air: SingleData[];
  hum_air: SingleData[];
};

type SingleData = {
  ts: number;
  value: string;
};

type PlantCardProps = {
  plantData: PlantData;
};

const PlantCard: React.FC<PlantCardProps> = ({ plantData }) => {
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Modify the options as needed for the desired format
  };

  return (
    <div className='plant-card'>
    <div><h3>Plant Card</h3></div>
      <div className='plant-card-column'>
        <div>
          <h4>Temperature (Ground)</h4>
          {plantData.temp_ground.map((data) => (
            <div key={data.ts}>
              Time: {formatTimestamp(data.ts)} | Value: {data.value}
            </div>
          ))}
        </div>
        <div>
          <h4>Humidity (Ground)</h4>
          {plantData.hum_ground.map((data) => (
            <div key={data.ts}>
              Time: {formatTimestamp(data.ts)} | Value: {data.value}
            </div>
          ))}
        </div>
        <div>
          <h4>Conductivity (Ground)</h4>
          {plantData.cond_ground.map((data) => (
            <div key={data.ts}>
              Time: {formatTimestamp(data.ts)} | Value: {data.value}
            </div>
          ))}
        </div>
      </div>
      <div className='plant-card-column'>
        <div>
          <h4>Temperature (Air)</h4>
          {plantData.temp_air.map((data) => (
            <div key={data.ts}>
              Time: {formatTimestamp(data.ts)} | Value: {data.value}
            </div>
          ))}
        </div>
        <div>
          <h4>Humidity (Air)</h4>
          {plantData.hum_air.map((data) => (
            <div key={data.ts}>
              Time: {formatTimestamp(data.ts)} | Value: {data.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
