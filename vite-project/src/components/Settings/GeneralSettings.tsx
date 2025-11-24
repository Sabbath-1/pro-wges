import React, { useState } from 'react';
import type { SystemSettings } from '../../pages/Settings';

interface GeneralSettingsProps {
  settings: SystemSettings;
  onSave: (settings: Partial<SystemSettings>) => void;
  isLoading: boolean;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ settings, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    organization_name: settings.organization_name,
    default_dues_amount: settings.default_dues_amount,
    currency: settings.currency,
    fiscal_year_start: settings.fiscal_year_start,
    payment_reminder_days: settings.payment_reminder_days,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">General Settings</h2>
          <p className="text-gray-600 mt-1">Basic organization and program settings</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Organization Settings */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Organization</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name *
              </label>
              <input
                type="text"
                required
                value={formData.organization_name}
                onChange={(e) => handleChange('organization_name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter organization name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Dues Amount *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">GHS</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.default_dues_amount}
                  onChange={(e) => handleChange('default_dues_amount', parseFloat(e.target.value))}
                  className="pl-12 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="GHS">Ghana Cedi (GHS)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fiscal Year Start
              </label>
              <input
                type="date"
                required
                value={formData.fiscal_year_start}
                onChange={(e) => handleChange('fiscal_year_start', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Reminder Days
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="14"
                value={formData.payment_reminder_days}
                onChange={(e) => handleChange('payment_reminder_days', parseInt(e.target.value))}
                className="w-32"
              />
              <span className="text-sm font-medium text-gray-700">
                {formData.payment_reminder_days} day{formData.payment_reminder_days !== 1 ? 's' : ''} before due date
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Send automatic payment reminders to members this many days before payment is due.
            </p>
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
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettings;