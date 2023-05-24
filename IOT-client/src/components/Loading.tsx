import Lottie from 'lottie-react';

import loadingData from '../assets/animations/loading.json';

export const Loading = () => {
  return <Lottie style={{ width: 200, height: 200 }} animationData={loadingData} autoPlay loop />;
};
