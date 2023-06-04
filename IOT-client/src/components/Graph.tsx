import React from 'react';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

type GraphProps = {
  data: any;
  target: string;
};

const Graph: React.FC<GraphProps> = ({ data, target }) => {
  const transformData = () => {
    const graphData = data[target].map((item: any) => {
      const date = new Date(item.ts);
      date.setDate(date.getDate());

      return {
        x: date,
        y: parseFloat(item.value),
      };
    });

    const labels = graphData.map((dataItem: any) => {
      const options = { month: 'short', day: 'numeric' };
      return dataItem.x.toLocaleDateString('en-US', options);
    });

    return {
      labels,
      datasets: [
        {
          label: target,
          data: graphData,
          borderColor: 'red',
          backgroundColor: 'transparent',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = transformData();

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Data for ' + target + ' in the last few days',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Measurement Unit',
          font: {
            size: 14,
            weight: 'bold',
          },
          padding: { top: 10 },
        },
      },
    },
    elements: {
      point: {
        radius: 0, // Uklanja oznaku kružića za svaku točku
      },
    },
  };

  return <Line options={options} data={chartData} />;
};

export default Graph;
