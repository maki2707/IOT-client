export type PlantData = {
    temp_ground: SingleData[];
    hum_ground: SingleData[];
    cond_ground: SingleData[];
    temp_air: SingleData[];
    hum_air: SingleData[];
  };
  
  export type SingleData = {
    ts: number;
    value: string;
  };