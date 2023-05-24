import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureThreeQuarters, faDroplet, faBolt } from '@fortawesome/free-solid-svg-icons';
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
  plantName: string
};

const PlantCard: React.FC<PlantCardProps> = ({ plantData, plantName }) => {
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Modify the options as needed for the desired format
  };

  return (
    <div className='plant-card'>
      <div>
        <h3>{plantName}</h3>
      </div>
      <div className='plant-data'>
        <div className='air-temp'>
          <span>Air temp</span>
          <p style={{marginBottom:'0'}}>{plantData.temp_air[0].value}°C</p>
          <FontAwesomeIcon
            icon={faTemperatureThreeQuarters}
            style={{ color: '#000000' }}
          />
        </div>
        <div className='air-hum'>
          <span>Air hum</span>
          <p style={{marginBottom:'0'}}>{plantData.hum_air[0].value}%</p>
          <FontAwesomeIcon
            icon={faDroplet}
            style={{ color: '#000000' }}
          />
        </div>
      </div>
      <div className='plant-data'>
        <div className='ground-temp'>
          <span>Soil temp</span>
          <p style={{marginBottom:'0'}}>{plantData.temp_ground[0].value}°C</p>
          <FontAwesomeIcon
            icon={faTemperatureThreeQuarters}
            style={{ color: '#000000' }}
          />
        </div>
        <div className='ground-hum'>
          <span>Soil hum</span>
          <p style={{marginBottom:'0'}}>{plantData.hum_ground[0].value}%</p>
          <FontAwesomeIcon
            icon={faDroplet}
            style={{ color: '#000000' }}
          />
        </div>
        <div className='ground-cond'>
          <span>Soil cond</span>
          <p style={{marginBottom:'0'}}>{plantData.cond_ground[0].value}S/m</p>
          <FontAwesomeIcon
            icon={faBolt}
            style={{ color: '#000000' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
