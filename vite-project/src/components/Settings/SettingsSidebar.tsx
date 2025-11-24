import React from 'react';
import type { SettingsTab } from '../../pages/Settings';

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'general' as SettingsTab, label: 'General', icon: '⚙️', description: 'Basic organization settings' },
    { id: 'users' as SettingsTab, label: 'User Management', icon: '👥', description: 'Manage system users' },
    { id: 'benefits' as SettingsTab, label: 'Benefit Types', icon: '🎁', description: 'Configure benefit programs' },
    { id: 'circuits' as SettingsTab, label: 'Circuits', icon: '🗺️', description: 'Manage member circuits' },
    { id: 'system' as SettingsTab, label: 'System', icon: '🔧', description: 'Advanced system settings' },
  ];

  return (
    <div className="lg:w-64 bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:sticky lg:top-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-600 mt-1">Manage your welfare program</p>
      </div>

      <nav className="space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{tab.icon}</span>
              <div className="flex-1">
                <div className="font-medium">{tab.label}</div>
                <div className="text-xs text-gray-500">{tab.description}</div>
              </div>
            </div>
          </button>
        ))}
      </nav>

      {/* System Status */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-2">System Status</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Version</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Backup</span>
            <span className="font-medium text-green-600">Today, 02:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Members</span>
            <span className="font-medium">1,355</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;