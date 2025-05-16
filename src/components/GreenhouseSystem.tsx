import React from 'react';
import { ComponentProps } from '../types';
import { Thermometer, LampDesk } from 'lucide-react';

const GreenhouseSystem: React.FC<ComponentProps> = ({ state }) => {
  const { temperature, greenhouseActive, heatingLevel } = state;
  
  // Temperature ranges for heating levels
  const getHeatingLevelText = () => {
    if (temperature < 10) return 'Cold';
    if (temperature < 15) return 'Very Low';
    if (temperature < 20) return 'Low';
    return 'Normal';
  };
  
  // Temperature color scale
  const getTemperatureColor = () => {
    if (temperature < 10) return 'text-blue-500';
    if (temperature < 15) return 'text-blue-400';
    if (temperature < 20) return 'text-green-500';
    return 'text-yellow-500';
  };
  
  return (
    <div className="relative h-48 border-2 border-slate-200 rounded-lg p-4 overflow-hidden">
      {/* Greenhouse Structure */}
      <div className="absolute inset-0 border-t-[40px] border-l-[15px] border-r-[15px] border-transparent border-b-[15px] border-b-amber-800 mx-4 mt-12">
        <div className="absolute inset-0 border-2 border-slate-300 rounded-t-full bg-sky-50/30"></div>
      </div>
      
      {/* Temperature Display */}
      <div className="absolute top-2 left-4 z-10 flex items-center">
        <Thermometer className={`w-6 h-6 ${getTemperatureColor()}`} />
        <div className="ml-1">
          <div className={`font-semibold ${getTemperatureColor()}`}>
            {temperature}°C
          </div>
          <div className="text-xs text-slate-600">
            {getHeatingLevelText()}
          </div>
        </div>
      </div>
      
      {/* Greenhouse Status */}
      <div className="absolute top-2 right-4 z-10">
        <div className={`text-sm font-medium px-2 py-0.5 rounded-full ${greenhouseActive ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
          {greenhouseActive ? 'Active' : 'Inactive'}
        </div>
      </div>
      
      {/* Heating Bulbs */}
      <div className="absolute left-0 right-0 top-6 flex justify-center z-10">
        <div className="flex space-x-6">
          {[...Array(4)].map((_, i) => {
            const isActive = greenhouseActive && i < heatingLevel;
            return (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-6 h-10 ${isActive ? 'bg-yellow-500' : 'bg-slate-300'} relative`}>
                  <div className="absolute top-0 left-0 right-0 h-2 bg-slate-400 rounded-t-sm"></div>
                  {isActive && (
                    <div className="absolute -bottom-6 w-12 h-12 bg-yellow-100 rounded-full opacity-50 animate-pulse"></div>
                  )}
                </div>
                <LampDesk className={`w-6 h-6 ${isActive ? 'text-yellow-500' : 'text-slate-400'} mt-2`} />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Plants */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-around z-10">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-2 h-8 bg-green-700"></div>
            <div className="w-8 h-4 bg-green-500 rounded-full -mt-1"></div>
          </div>
        ))}
      </div>
      
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-amber-800"></div>
    </div>
  );
};

export default GreenhouseSystem;