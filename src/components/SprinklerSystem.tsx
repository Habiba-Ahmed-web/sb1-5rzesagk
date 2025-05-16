import React from 'react';
import { ComponentProps } from '../types';
import { Droplet, CloudRain, Thermometer } from 'lucide-react';

const SprinklerSystem: React.FC<ComponentProps> = ({ state }) => {
  const { temperature, waterClean, sprinklersActive } = state;
  
  // Determine if sprinklers should be on based on temperature
  const heatAlert = temperature > 30;
  const systemActive = waterClean && (sprinklersActive || heatAlert);
  
  // Temperature color scale
  const getTemperatureColor = () => {
    if (temperature < 10) return 'text-blue-500';
    if (temperature < 20) return 'text-green-500';
    if (temperature < 30) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  return (
    <div className="relative h-48 border-2 border-slate-200 rounded-lg p-4">
      {/* Temperature Display */}
      <div className="absolute top-2 left-4 flex items-center">
        <Thermometer className={`w-6 h-6 ${getTemperatureColor()}`} />
        <div className={`ml-1 font-semibold ${getTemperatureColor()}`}>
          {temperature}°C
        </div>
        {heatAlert && (
          <div className="ml-2 text-xs text-white bg-red-500 px-2 py-0.5 rounded-full animate-pulse">
            Heat Alert
          </div>
        )}
      </div>
      
      {/* Water Tank */}
      <div className="absolute top-2 right-4 flex flex-col items-center">
        <div className={`w-14 h-14 rounded-md ${waterClean ? 'bg-blue-400' : 'bg-slate-200'} flex items-center justify-center border border-slate-400`}>
          <Droplet className={`w-6 h-6 ${waterClean ? 'text-blue-600' : 'text-slate-400'}`} />
        </div>
        <div className="text-xs text-slate-700 mt-1">Water Tank</div>
      </div>
      
      {/* Sprinkler Gate */}
      <div className="absolute top-6 right-24">
        <div className={`h-6 w-12 ${systemActive ? 'bg-green-500' : 'bg-red-500'} rounded-sm flex items-center justify-center`}>
          <span className="text-white text-xs">Gate</span>
        </div>
      </div>
      
      {/* Sprinkler Motor */}
      <div className="absolute top-16 right-24">
        <div className={`h-8 w-12 ${systemActive ? 'bg-green-500' : 'bg-slate-400'} rounded-md flex items-center justify-center`}>
          <span className="text-white text-xs">Motor</span>
        </div>
      </div>
      
      {/* Sprinkler Pipes */}
      <div className="absolute bottom-10 left-4 right-4 flex justify-around">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`h-16 w-2 ${systemActive ? 'bg-blue-400' : 'bg-slate-200'}`}></div>
            <div className="relative">
              <CloudRain 
                className={`w-8 h-8 ${systemActive ? 'text-blue-500' : 'text-slate-300'} ${systemActive ? 'animate-bounce' : ''}`} 
              />
              {systemActive && (
                <div className="absolute -bottom-8 w-16 h-2 bg-blue-200 rounded-full left-1/2 transform -translate-x-1/2"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Crops */}
      <div className="absolute bottom-2 left-4 right-4 flex justify-around">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-6 h-6 bg-green-500 rounded-full"></div>
        ))}
      </div>
    </div>
  );
};

export default SprinklerSystem;