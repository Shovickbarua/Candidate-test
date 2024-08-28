import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import DataApi from './api/DataApi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const App = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const getData = async () => {
    const res = await DataApi.index();
    // console.log('res', res);

    const labels = [];
    const dataValues = [];

    res[0]['2024'].forEach((monthData) => {
      const monthKey = Object.keys(monthData)[0]; 
      monthData[monthKey].forEach((dayData) => {
        const dateKey = Object.keys(dayData)[0]; 
        labels.push(dateKey);
        dataValues.push(dayData[dateKey]);
      });
    });

    setChartData({
      labels: labels, 
      datasets: [
        {
          label: 'Values',
          data: dataValues, 
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2>Bar Chart</h2>
      {chartData.labels.length ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Data Bar Chart',
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                ticks: {
                  autoSkip: true,
                  // maxTicksLimit: 10,
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default App;
