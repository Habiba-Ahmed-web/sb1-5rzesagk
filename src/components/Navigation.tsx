import React from 'react';
import { LayoutDashboard, Droplets, Sprout, Thermometer, LineChart } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const sections = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'purification', name: 'Water Purification', icon: Droplets },
    { id: 'irrigation', name: 'Irrigation', icon: Sprout },
    { id: 'climate', name: 'Climate Control', icon: Thermometer },
    { id: 'analytics', name: 'Analytics', icon: LineChart },
  ];

  return (
    <nav className="bg-white shadow-md rounded-lg p-2 mb-6">
      <ul className="flex flex-wrap justify-center gap-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <li key={section.id}>
              <button
                onClick={() => onSectionChange(section.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  activeSection === section.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                <span className="font-medium">{section.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;