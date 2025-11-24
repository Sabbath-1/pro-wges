import React, { useState } from 'react';
import type { SystemSettings as SystemSettingsType } from '../../pages/Settings';

interface SystemSettingsProps {
  settings: SystemSettingsType;
  onSave: (settings: Partial<SystemSettingsType>) => void;
  isLoading: boolean;
}

const SystemSettings: React.FC<SystemSettingsProps> = ({ settings, onSave, isLoading }) => {
  const [systemSettings, setSystemSettings] = useState({
    benefit_approval_required: settings.benefit_approval_required,
    auto_export_reports: settings.auto_export_reports,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(systemSettings);
  };

  const handleToggle = (setting: keyof typeof systemSettings) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">System Settings</h2>
        <p className="text-gray-600 mt-1">Advanced system configuration and preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Workflow Settings */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Require Benefit Approval</h4>
                <p className="text-sm text-gray-500">
                  Benefits require supervisor approval before disbursement
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('benefit_approval_required')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  systemSettings.benefit_approval_required ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    systemSettings.benefit_approval_required ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Auto-Export Reports</h4>
                <p className="text-sm text-gray-500">
                  Automatically export monthly reports to administrators
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('auto_export_reports')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  systemSettings.auto_export_reports ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    systemSettings.auto_export_reports ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Database Backup</h4>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <span>🔄</span>
                  <span>Create Backup</span>
                </button>
                <span className="text-sm text-gray-500">
                  Last backup: Today, 02:00
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Data Export</h4>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center space-x-1"
                >
                  <span>📊</span>
                  <span>Export All Data</span>
                </button>
                <button
                  type="button"
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center space-x-1"
                >
                  <span>👥</span>
                  <span>Export Members</span>
                </button>
                <button
                  type="button"
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center space-x-1"
                >
                  <span>💰</span>
                  <span>Export Financials</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">System Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Update</span>
              <span className="font-medium">2024-01-15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Database Size</span>
              <span className="font-medium">45.2 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Users</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Members</span>
              <span className="font-medium">1,355</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Server Status</span>
              <span className="font-medium text-green-600">Online</span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-lg p-6 border border-red-200">
          <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-red-900 mb-2">Reset System</h4>
              <p className="text-sm text-red-700 mb-3">
                This will reset all system data to factory defaults. This action cannot be undone.
              </p>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                onClick={() => {
                  if (confirm('Are you sure you want to reset the system? This will delete all data.')) {
                    console.log('System reset initiated');
                  }
                }}
              >
                <span>🚨</span>
                <span>Reset System</span>
              </button>
            </div>

            <div>
              <h4 className="text-sm font-medium text-red-900 mb-2">Delete All Data</h4>
              <p className="text-sm text-red-700 mb-3">
                Permanently delete all member, payment, and benefit data.
              </p>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                onClick={() => {
                  if (confirm('Are you sure you want to delete all data? This action cannot be undone.')) {
                    console.log('Data deletion initiated');
                  }
                }}
              >
                <span>🗑️</span>
                <span>Delete All Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span>💾</span>
                <span>Save System Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SystemSettings;