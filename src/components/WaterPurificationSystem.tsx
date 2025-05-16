import React from 'react';
import { ComponentProps } from '../types';
import { Droplet, Filter, AlertCircle, Check } from 'lucide-react';

const WaterPurificationSystem: React.FC<ComponentProps> = ({ state }) => {
  const { waterGateOpen, motorRunning, waterFiltered, waterClean } = state;
  
  // Animation classes based on state
  const waterFlowClass = waterGateOpen && motorRunning ? 'animate-pulse' : '';
  const purityIndicatorColor = waterClean ? 'text-green-500' : 'text-red-500';
  const purityIcon = waterClean ? <Check className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />;
  
  return (
    <div className="relative h-64 border-2 border-slate-200 rounded-lg p-4">
      {/* Water Source */}
      <div className="absolute top-4 left-4 flex flex-col items-center">
        <div className="text-blue-800 font-semibold mb-1">Source</div>
        <div className="w-20 h-20 rounded-full bg-blue-300 flex items-center justify-center">
          <Droplet className="w-10 h-10 text-blue-600" />
        </div>
        <div className="text-sm text-slate-500 mt-1">Contaminated Water</div>
      </div>
      
      {/* Gate and Motor */}
      <div className="absolute top-10 left-32">
        <div className={`h-8 w-16 ${waterGateOpen ? 'bg-green-500' : 'bg-red-500'} rounded-md flex items-center justify-center`}>
          <span className="text-white text-xs font-semibold">
            Gate {waterGateOpen ? 'Open' : 'Closed'}
          </span>
        </div>
        <div className={`h-8 w-16 mt-2 ${motorRunning ? 'bg-green-500' : 'bg-slate-400'} rounded-md flex items-center justify-center`}>
          <span className="text-white text-xs font-semibold">
            Motor {motorRunning ? 'On' : 'Off'}
          </span>
        </div>
      </div>

      {/* Water Flow Animation */}
      <div className={`absolute top-14 left-52 w-40 h-4 bg-blue-400 ${waterFlowClass}`}></div>
      
      {/* Filter */}
      <div className="absolute top-8 right-40 flex flex-col items-center">
        <div className="text-blue-800 font-semibold mb-1">Filter</div>
        <div className={`w-16 h-16 rounded-md ${waterFiltered ? 'bg-blue-200' : 'bg-slate-300'} flex items-center justify-center`}>
          <Filter className={`w-8 h-8 ${waterFiltered ? 'text-blue-600' : 'text-slate-500'}`} />
        </div>
      </div>
      
      {/* Purity Sensor */}
      <div className="absolute top-8 right-6 flex flex-col items-center">
        <div className="text-blue-800 font-semibold mb-1">Purity Sensor</div>
        <div className={`w-16 h-16 rounded-md bg-white border-2 ${waterClean ? 'border-green-500' : 'border-red-500'} flex items-center justify-center`}>
          <span className={purityIndicatorColor}>{purityIcon}</span>
        </div>
        <div className={`text-sm ${purityIndicatorColor} mt-1 font-medium`}>
          {waterClean ? 'Clean' : 'Unclean'}
        </div>
      </div>
      
      {/* Clean Water Tank */}
      <div className="absolute bottom-4 right-10 flex flex-col items-center">
        <div className={`w-24 h-24 rounded-md ${waterClean ? 'bg-blue-400' : 'bg-slate-200'} flex items-center justify-center border-2 border-slate-400`}>
          <Droplet className={`w-10 h-10 ${waterClean ? 'text-blue-600' : 'text-slate-400'}`} />
        </div>
        <div className="text-sm text-slate-700 mt-1 font-medium">Clean Water Tank</div>
      </div>
      
      {/* Process Flow Arrows */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#475569"/>
          </marker>
        </defs>
        <line x1="70" y1="40" x2="120" y2="40" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <line x1="170" y1="40" x2="220" y2="40" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <line x1="280" y1="40" x2="330" y2="40" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <line x1="360" y1="70" x2="360" y2="130" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)"/>
      </svg>
    </div>
  );
};

export default WaterPurificationSystem;