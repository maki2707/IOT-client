export type SensorData = {
    temp_ground: SensorReading[];
    hum_ground: SensorReading[];
    cond_ground: SensorReading[];
    temp_air: SensorReading[];
    hum_air: SensorReading[];
  };
  
 export type SensorReading = {
    ts: number;
    value: string;
  };