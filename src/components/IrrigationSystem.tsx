import React from 'react';
import { ComponentProps } from '../types';
import { Droplet, CloudRain, Sprout, FlaskRound as Flask, AlertCircle } from 'lucide-react';

const IrrigationSystem: React.FC<ComponentProps> = ({ state }) => {
  const { waterClean, soilMoisture, soilAcidity, fertilizerLevel } = state;
  
  // Determine if irrigation is needed based on soil moisture
  const irrigationActive = waterClean && soilMoisture < 70;
  
  // Determine if fertilizer is needed based on acidity
  const fertilizerNeeded = soilAcidity > 7.5;
  const fertilizerActive = irrigationActive && fertilizerNeeded;
  
  // Determine LED color based on fertilizer level
  const ledColor = fertilizerLevel > 20 ? 'bg-green-500' : 'bg-red-500';
  
  return (
    <div className="relative h-48 border-2 border-slate-200 rounded-lg p-4">
      {/* Water Tank */}
      <div className="absolute top-2 left-4 flex flex-col items-center">
        <div className={`w-14 h-14 rounded-md ${waterClean ? 'bg-blue-400' : 'bg-slate-200'} flex items-center justify-center border border-slate-400`}>
          <Droplet className={`w-6 h-6 ${waterClean ? 'text-blue-600' : 'text-slate-400'}`} />
        </div>
        <div className="text-xs text-slate-700 mt-1">Water Tank</div>
      </div>
      
      {/* Water Gate */}
      <div className="absolute top-6 left-24">
        <div className={`h-6 w-12 ${irrigationActive ? 'bg-green-500' : 'bg-red-500'} rounded-sm flex items-center justify-center`}>
          <span className="text-white text-xs">Gate</span>
        </div>
      </div>
      
      {/* Irrigation Pipes */}
      <div className="absolute top-12 left-40 w-36 h-20">
        <div className={`h-3 w-full ${irrigationActive ? 'bg-blue-400' : 'bg-slate-200'} mb-2`}></div>
        <div className="flex justify-between">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`h-10 w-3 ${irrigationActive ? 'bg-blue-400' : 'bg-slate-200'}`}></div>
              <CloudRain className={`w-6 h-6 ${irrigationActive ? 'text-blue-400' : 'text-slate-300'} ${irrigationActive ? 'animate-bounce' : ''}`} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Soil */}
      <div className="absolute bottom-2 left-4 right-4 h-10 bg-amber-800 rounded-sm flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          <div 
            className="absolute bottom-0 left-0 right-0 bg-amber-600 transition-all duration-500 ease-in-out"
            style={{ height: `${soilMoisture}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sprout className="w-6 h-6 text-green-500" />
            <span className="text-white text-xs ml-1">Soil Moisture: {soilMoisture}%</span>
          </div>
        </div>
      </div>
      
      {/* Fertilizer Tank */}
      <div className="absolute top-2 right-4 flex flex-col items-center">
        <div className="flex items-center mb-1">
          <div className={`w-4 h-4 rounded-full ${ledColor} mr-1`}></div>
          <div className="text-xs text-slate-700">
            {fertilizerLevel > 20 ? 'Full' : 'Low'}
          </div>
        </div>
        <div className="w-12 h-16 rounded-md bg-green-100 border border-green-400 flex items-center justify-center overflow-hidden">
          <Flask className="w-8 h-8 text-green-600 absolute" />
          <div 
            className="absolute bottom-0 left-0 right-0 bg-green-400 transition-all duration-500"
            style={{ height: `${fertilizerLevel}%` }}
          ></div>
        </div>
        <div className="text-xs text-slate-700 mt-1">Fertilizer</div>
      </div>
      
      {/* Fertilizer Gate */}
      <div className="absolute top-6 right-24">
        <div className={`h-6 w-12 ${fertilizerActive ? 'bg-green-500' : 'bg-red-500'} rounded-sm flex items-center justify-center`}>
          <span className="text-white text-xs">Gate</span>
        </div>
      </div>
      
      {/* Acidity Meter */}
      <div className="absolute top-20 right-4 flex flex-col items-center">
        <div className="text-xs text-slate-700 mb-1">pH: {soilAcidity.toFixed(1)}</div>
        <div className="w-full h-3 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-full">
          <div 
            className="w-3 h-3 bg-white border border-slate-400 rounded-full relative"
            style={{ marginLeft: `${(soilAcidity / 14) * 100}%`, transform: 'translateX(-50%)' }}
          ></div>
        </div>
        <div className="flex justify-between w-full text-[10px] text-slate-600 mt-1">
          <span>0</span>
          <span>7</span>
          <span>14</span>
        </div>
      </div>
    </div>
  );
};

export default IrrigationSystem;