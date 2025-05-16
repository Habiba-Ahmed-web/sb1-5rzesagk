import React from 'react';
import { ControlPanelProps } from '../types';
import { Droplet, Thermometer, FlaskRound as Flask, CloudRain, LampDesk } from 'lucide-react';

const ControlPanel: React.FC<ControlPanelProps> = ({ state, updateState }) => {
  const toggleWaterGate = () => {
    updateState({ waterGateOpen: !state.waterGateOpen });
  };
  
  const toggleMotor = () => {
    updateState({ motorRunning: !state.motorRunning });
  };
  
  const toggleWaterFilter = () => {
    updateState({ waterFiltered: !state.waterFiltered });
  };
  
  const toggleWaterClean = () => {
    updateState({ waterClean: !state.waterClean });
  };
  
  const toggleSprinklers = () => {
    updateState({ sprinklersActive: !state.sprinklersActive });
  };
  
  const toggleGreenhouse = () => {
    updateState({ greenhouseActive: !state.greenhouseActive });
  };
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateState({ [name]: parseFloat(value) });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
          <Droplet className="w-5 h-5 mr-1" />
          Water Purification
        </h3>
        <div className="space-y-3">
          <button
            onClick={toggleWaterGate}
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
              state.waterGateOpen ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            Water Gate: {state.waterGateOpen ? 'Open' : 'Closed'}
          </button>
          
          <button
            onClick={toggleMotor}
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
              state.motorRunning ? 'bg-green-500 hover:bg-green-600' : 'bg-slate-500 hover:bg-slate-600'
            }`}
          >
            Motor: {state.motorRunning ? 'Running' : 'Off'}
          </button>
          
          <button
            onClick={toggleWaterFilter}
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
              state.waterFiltered ? 'bg-blue-500 hover:bg-blue-600' : 'bg-slate-500 hover:bg-slate-600'
            }`}
          >
            Filter: {state.waterFiltered ? 'Active' : 'Inactive'}
          </button>
          
          <button
            onClick={toggleWaterClean}
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
              state.waterClean ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            Water: {state.waterClean ? 'Clean' : 'Contaminated'}
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
          <Flask className="w-5 h-5 mr-1" />
          Soil Conditions
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="soilMoisture" className="text-sm text-slate-600">
                Soil Moisture: {state.soilMoisture}%
              </label>
              {state.soilMoisture < 70 && (
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  Irrigation Needed
                </span>
              )}
            </div>
            <input
              type="range"
              id="soilMoisture"
              name="soilMoisture"
              min="0"
              max="100"
              value={state.soilMoisture}
              onChange={handleSliderChange}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="soilAcidity" className="text-sm text-slate-600">
                Soil pH: {state.soilAcidity.toFixed(1)}
              </label>
              {state.soilAcidity > 7.5 && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  Fertilizer Needed
                </span>
              )}
            </div>
            <input
              type="range"
              id="soilAcidity"
              name="soilAcidity"
              min="0"
              max="14"
              step="0.1"
              value={state.soilAcidity}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="fertilizerLevel" className="text-sm text-slate-600">
                Fertilizer Level: {state.fertilizerLevel}%
              </label>
              {state.fertilizerLevel <= 20 && (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                  Low Fertilizer
                </span>
              )}
            </div>
            <input
              type="range"
              id="fertilizerLevel"
              name="fertilizerLevel"
              min="0"
              max="100"
              value={state.fertilizerLevel}
              onChange={handleSliderChange}
              className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-amber-700 mb-3 flex items-center">
          <Thermometer className="w-5 h-5 mr-1" />
          Climate Control
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="temperature" className="text-sm text-slate-600">
                Temperature: {state.temperature}°C
              </label>
              {state.temperature > 30 && (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full animate-pulse">
                  Heat Alert
                </span>
              )}
            </div>
            <input
              type="range"
              id="temperature"
              name="temperature"
              min="5"
              max="40"
              value={state.temperature}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={toggleSprinklers}
              className={`py-2 px-4 rounded-md text-white font-medium transition-colors flex items-center justify-center ${
                state.sprinklersActive ? 'bg-blue-500 hover:bg-blue-600' : 'bg-slate-500 hover:bg-slate-600'
              }`}
            >
              <CloudRain className="w-4 h-4 mr-1" />
              Sprinklers: {state.sprinklersActive ? 'On' : 'Off'}
            </button>
            
            <button
              onClick={toggleGreenhouse}
              className={`py-2 px-4 rounded-md text-white font-medium transition-colors flex items-center justify-center ${
                state.greenhouseActive ? 'bg-green-500 hover:bg-green-600' : 'bg-slate-500 hover:bg-slate-600'
              }`}
            >
              <LampDesk className="w-4 h-4 mr-1" />
              Greenhouse: {state.greenhouseActive ? 'On' : 'Off'}
            </button>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="heatingLevel" className="text-sm text-slate-600">
                Heating Level: {state.heatingLevel} {state.heatingLevel === 1 ? 'Bulb' : 'Bulbs'}
              </label>
            </div>
            <input
              type="range"
              id="heatingLevel"
              name="heatingLevel"
              min="1"
              max="4"
              step="1"
              value={state.heatingLevel}
              onChange={handleSliderChange}
              className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;