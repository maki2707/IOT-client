import { Button } from 'antd';
import { useActuate } from '../hooks/useActuate';
import useGetDevices from '../hooks/useGetDevices';
import PlantCard from '../components/PlantCard';

export const MyFlowers = () => {
  const { data: devicesData } = useGetDevices();
  const actuate = useActuate();

  const handleActuate = async () => {
    await actuate();
  };

  return (
    <>
      {devicesData && (
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div className="plant-text">My plants</div>
            <Button onClick={handleActuate} type="primary">
              Actuate
            </Button>
          </div>
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
