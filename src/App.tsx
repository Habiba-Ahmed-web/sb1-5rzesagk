import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import Navigation from './components/Navigation';
import WaterPurificationSystem from './components/WaterPurificationSystem';
import IrrigationSystem from './components/IrrigationSystem';
import SprinklerSystem from './components/SprinklerSystem';
import GreenhouseSystem from './components/GreenhouseSystem';
import ControlPanel from './components/ControlPanel';
import Analytics from './components/Analytics';
import { SystemState, Alert } from './types';
import { AlertTriangle, Bell } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [systemState, setSystemState] = useState<SystemState>({
    waterGateOpen: false,
    motorRunning: false,
    waterFiltered: false,
    waterClean: false,
    soilMoisture: 50,
    soilAcidity: 6.5,
    temperature: 25,
    fertilizerLevel: 80,
    sprinklersActive: false,
    greenhouseActive: true,
    heatingLevel: 1,
    waterUsage: 0,
    waterQuality: 95,
    lastMaintenance: new Date(),
    alerts: []
  });

  const updateSystemState = (newState: Partial<SystemState>) => {
    setSystemState(prevState => ({
      ...prevState,
      ...newState
    }));
  };

  useEffect(() => {
    // Check for system alerts
    if (systemState.waterQuality < 90) {
      addAlert({
        type: 'danger',
        message: 'Water quality below threshold',
      });
    }
    if (systemState.fertilizerLevel < 20) {
      addAlert({
        type: 'warning',
        message: 'Low fertilizer level',
      });
    }
    if (systemState.temperature > 30) {
      addAlert({
        type: 'warning',
        message: 'High temperature detected',
      });
    }
  }, [systemState.waterQuality, systemState.fertilizerLevel, systemState.temperature]);

  const addAlert = ({ type, message }: { type: Alert['type']; message: string }) => {
    const newAlert: Alert = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      message,
      timestamp: new Date(),
    };
    
    updateSystemState({
      alerts: [...systemState.alerts, newAlert]
    });

    toast[type](message, {
      duration: 4000,
    });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="elegant-card p-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">System Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <WaterPurificationSystem state={systemState} />
                  <IrrigationSystem state={systemState} />
                </div>
              </div>
              <Analytics state={systemState} />
            </div>
            <div className="lg:col-span-1">
              <ControlPanel state={systemState} updateState={updateSystemState} />
            </div>
          </div>
        );
      case 'purification':
        return (
          <div className="elegant-card p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Water Purification System</h2>
            <WaterPurificationSystem state={systemState} />
          </div>
        );
      case 'irrigation':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="elegant-card p-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4">Irrigation System</h2>
              <IrrigationSystem state={systemState} />
            </div>
            <div className="elegant-card p-6">
              <h2 className="text-xl font-semibold text-sky-700 mb-4">Sprinkler System</h2>
              <SprinklerSystem state={systemState} />
            </div>
          </div>
        );
      case 'climate':
        return (
          <div className="elegant-card p-6">
            <h2 className="text-xl font-semibold text-amber-700 mb-4">Climate Control</h2>
            <GreenhouseSystem state={systemState} />
          </div>
        );
      case 'analytics':
        return <Analytics state={systemState} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-50 p-4 md:p-8">
      <Toaster position="top-right" expand={true} richColors />
      
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
          Smart Water Management System
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Comprehensive monitoring and control for water purification, irrigation, and greenhouse systems
        </p>
      </header>

      <div className="max-w-7xl mx-auto">
        <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <div className="mb-6">
          {systemState.alerts.length > 0 && (
            <div className="elegant-card p-4 mb-6">
              <h3 className="text-lg font-semibold text-slate-700 mb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                Active Alerts
              </h3>
              <div className="space-y-2">
                {systemState.alerts.slice(-3).map(alert => (
                  <div key={alert.id} className={`alert-badge ${alert.type}`}>
                    {alert.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {renderSection()}
      </div>
      
      <footer className="mt-12 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Smart Water Management System | All rights reserved
      </footer>
    </div>
  );
}

export default App;