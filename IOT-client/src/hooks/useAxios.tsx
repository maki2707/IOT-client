import axios from 'axios';

const useAxios = () => {
  const instance = axios.create({
    baseURL: 'https://BASE-URL/',
  });

  return instance;
};

export default useAxios;
