import React, { useState } from 'react';
import SettingsSidebar from '../components/Settings/SettingsSidebar';
import GeneralSettings from '../components/Settings/GeneralSettings';
import UserManagement from '../components/Settings/UserManagement';
import BenefitTypesSettings from '../components/Settings/BenefitTypesSettings';
import CircuitSettings from '../components/Settings/CircuitSettings';
import SystemSettings from '../components/Settings/SystemSettings';

export type SettingsTab = 'general' | 'users' | 'benefits' | 'circuits' | 'system';

export interface SystemSettings {
  organization_name: string;
  organization_logo: string;
  default_dues_amount: number;
  currency: string;
  fiscal_year_start: string;
  payment_reminder_days: number;
  benefit_approval_required: boolean;
  auto_export_reports: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'executive' | 'viewer';
  status: 'active' | 'inactive';
  last_login: string;
  created_at: string;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for settings
  const systemSettings: SystemSettings = {
    organization_name: 'Ghana Welfare Program',
    organization_logo: '',
    default_dues_amount: 25.00,
    currency: 'GHS',
    fiscal_year_start: '2024-01-01',
    payment_reminder_days: 7,
    benefit_approval_required: true,
    auto_export_reports: false
  };

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@welfare.org',
      role: 'admin',
      status: 'active',
      last_login: '2024-01-15 14:30:00',
      created_at: '2023-06-01'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@welfare.org',
      role: 'executive',
      status: 'active',
      last_login: '2024-01-14 09:15:00',
      created_at: '2023-08-15'
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma.davis@welfare.org',
      role: 'executive',
      status: 'active',
      last_login: '2024-01-13 16:45:00',
      created_at: '2023-09-20'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@welfare.org',
      role: 'viewer',
      status: 'inactive',
      last_login: '2023-12-05 11:20:00',
      created_at: '2023-10-10'
    }
  ];

  const handleSaveSettings = async (settings: Partial<SystemSettings>) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Saving settings:', settings);
    setIsLoading(false);
    // Here you would make actual API call to save settings
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'general':
        return (
          <GeneralSettings 
            settings={systemSettings} 
            onSave={handleSaveSettings}
            isLoading={isLoading}
          />
        );
      case 'users':
        return (
          <UserManagement 
            users={mockUsers}
            onSave={handleSaveSettings}
            isLoading={isLoading}
          />
        );
      case 'benefits':
        return (
          <BenefitTypesSettings 
            onSave={handleSaveSettings}
            isLoading={isLoading}
          />
        );
      case 'circuits':
        return (
          <CircuitSettings 
            onSave={handleSaveSettings}
            isLoading={isLoading}
          />
        );
      case 'system':
        return (
          <SystemSettings 
            settings={systemSettings}
            onSave={handleSaveSettings}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <SettingsSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default Settings;