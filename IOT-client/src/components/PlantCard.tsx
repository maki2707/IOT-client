import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTemperatureThreeQuarters,
  faDroplet,
  faBolt,
  faArrowsRotate,
} from '@fortawesome/free-solid-svg-icons';
import { useGetPlantTelemetry } from '../hooks/useGetPlantTelemetry';
import React, { useState } from 'react';
import { useGetAvgPlantTelemetry } from '../hooks/useGetAvgDeviceTelemtry';
import Graph from './Graph';

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
  dataD: any;
  plantName: string;
};

const PlantCard: React.FC<PlantCardProps> = ({ dataD, plantName }) => {
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Modify the options as needed for the desired format
  };

  const { data: plantData, refetch: refetchPlantData } = useGetPlantTelemetry(dataD);
  const { data: plantAvgData } = useGetAvgPlantTelemetry(dataD);
  const lastUpdateTime = plantData ? formatTimestamp(plantData.temp_air[0].ts) : '';
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [graphTarget, setGraphTarget] = useState('temp_air');
  const handleRefreshData = () => {
    setIsFetchingData(true);
    refetchPlantData().then(() => {
      setTimeout(() => {
        setIsFetchingData(false);
      }, 1000);
    });
  };

  return (
    <div className="plant-card">
      {plantData && plantAvgData && (
        <>
          <div style={{ display: 'flex', alignContent: 'space-around' }}>
            <div>
              <h3>{plantName}</h3>
            </div>
            <div style={{ color: '#000000', marginLeft: 'auto' }}>
              {isFetchingData ? (
                <FontAwesomeIcon
                  icon={faArrowsRotate}
                  spin
                  style={{ height: '2rem' }}
                  onClick={handleRefreshData}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faArrowsRotate}
                  style={{ height: '2rem' }}
                  onClick={handleRefreshData}
                />
              )}
            </div>
          </div>
          <div className="plant-data">
            <div className="air-temp">
              <span>Air temp</span>
              <p style={{ marginBottom: '0' }}>
                {parseFloat(plantData.temp_air[0].value).toFixed(2)}°C
              </p>
              <FontAwesomeIcon icon={faTemperatureThreeQuarters} style={{ color: '#000000' }} />
            </div>
            <div className="air-hum">
              <span>Air hum</span>
              <p style={{ marginBottom: '0' }}>
                {parseFloat(plantData.hum_air[0].value).toFixed(2)}%
              </p>
              <FontAwesomeIcon icon={faDroplet} style={{ color: '#000000' }} />
            </div>
          </div>
          <div className="plant-data">
            <div className="ground-temp">
              <span>Soil temp</span>
              <p style={{ marginBottom: '0' }}>
                {parseFloat(plantData.temp_ground[0].value).toFixed(2)}°C
              </p>
              <FontAwesomeIcon icon={faTemperatureThreeQuarters} style={{ color: '#000000' }} />
            </div>
            <div className="ground-hum">
              <span>Soil hum</span>
              <p style={{ marginBottom: '0' }}>
                {parseFloat(plantData.hum_ground[0].value).toFixed(2)} cbar
              </p>
              <FontAwesomeIcon icon={faDroplet} style={{ color: '#000000' }} />
            </div>
            <div className="ground-cond">
              <span>Soil cond</span>
              <p style={{ marginBottom: '0' }}>
                {parseFloat(plantData.cond_ground[0].value).toFixed(2)} S/m
              </p>
              <FontAwesomeIcon icon={faBolt} style={{ color: '#000000' }} />
            </div>
          </div>
          <div style={{ fontStyle: 'italic' }}>
            Updated: <span style={{ fontWeight: '700' }}>{lastUpdateTime}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.25rem', alignContent: 'space-between' }}>
            <div
              className={`air-temp ${graphTarget === 'temp_air' ? 'selected' : ''}`}
              style={{ height: '2rem' }}
              onClick={() => {
                setGraphTarget('temp_air');
              }}
            >
              <span>Air temp</span>
              <FontAwesomeIcon icon={faTemperatureThreeQuarters} style={{ color: '#000000' }} />
            </div>
            <div
              className={`air-hum ${graphTarget === 'hum_air' ? 'selected' : ''}`}
              style={{ height: '2rem' }}
              onClick={() => {
                setGraphTarget('hum_air');
              }}
            >
              <span>Air hum</span>
              <FontAwesomeIcon icon={faDroplet} style={{ color: '#000000' }} />
            </div>
            <div
              className={`ground-temp ${graphTarget === 'temp_ground' ? 'selected' : ''}`}
              style={{ height: '2rem' }}
              onClick={() => {
                setGraphTarget('temp_ground');
              }}
            >
              <span>Soil temp</span>
              <FontAwesomeIcon icon={faTemperatureThreeQuarters} style={{ color: '#000000' }} />
            </div>
            <div
              className={`ground-hum ${graphTarget === 'hum_ground' ? 'selected' : ''}`}
              style={{ height: '2rem' }}
              onClick={() => {
                setGraphTarget('hum_ground');
              }}
            >
              <span>Soil hum</span>
              <FontAwesomeIcon icon={faDroplet} style={{ color: '#000000' }} />
            </div>
            <div
              className={`ground-cond ${graphTarget === 'cond_ground' ? 'selected' : ''}`}
              style={{ height: '2rem' }}
              onClick={() => {
                setGraphTarget('cond_ground');
              }}
            >
              <span>Soil cond</span>
              <FontAwesomeIcon icon={faBolt} style={{ color: '#000000' }} />
            </div>
          </div>
          {plantAvgData && <Graph data={plantAvgData} target={graphTarget} />}
        </>
      )}
    </div>
  );
};

export default PlantCard;
