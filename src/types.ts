export interface SystemState {
  waterGateOpen: boolean;
  motorRunning: boolean;
  waterFiltered: boolean;
  waterClean: boolean;
  soilMoisture: number;
  soilAcidity: number;
  temperature: number;
  fertilizerLevel: number;
  sprinklersActive: boolean;
  greenhouseActive: boolean;
  heatingLevel: number;
  waterUsage: number;
  waterQuality: number;
  lastMaintenance: Date;
  alerts: Alert[];
}

export interface Alert {
  id: string;
  type: 'warning' | 'danger' | 'success';
  message: string;
  timestamp: Date;
}

export interface ComponentProps {
  state: SystemState;
}

export interface ControlPanelProps {
  state: SystemState;
  updateState: (newState: Partial<SystemState>) => void;
}

export interface WaterUsageData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}