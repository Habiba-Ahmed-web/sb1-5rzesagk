import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { ComponentProps } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics: React.FC<ComponentProps> = ({ state }) => {
  const waterUsageData = {
    labels: ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
    datasets: [
      {
        label: 'Water Usage (Liters)',
        data: [150, 250, 180, 220, 190, 280, 200],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Water Quality (%)',
        data: [95, 92, 96, 94, 95, 93, 97],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Water Usage & Quality Analytics',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="elegant-card p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">System Analytics</h2>
        <p className="text-slate-600">Daily water usage and quality monitoring</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-slate-700">Total Usage</h3>
          <p className="text-3xl font-bold text-blue-600">1,470L</p>
          <p className="text-sm text-slate-500">Today's consumption</p>
        </div>
        
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-slate-700">Quality Index</h3>
          <p className="text-3xl font-bold text-green-600">94.3%</p>
          <p className="text-sm text-slate-500">Average purity</p>
        </div>
        
        <div className="stat-card">
          <h3 className="text-lg font-semibold text-slate-700">Efficiency</h3>
          <p className="text-3xl font-bold text-amber-600">98.5%</p>
          <p className="text-sm text-slate-500">System performance</p>
        </div>
      </div>
      
      <div className="h-[400px]">
        <Line options={options} data={waterUsageData} />
      </div>
    </div>
  );
};

export default Analytics;