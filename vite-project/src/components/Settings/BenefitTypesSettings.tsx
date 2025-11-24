import React, { useState } from 'react';

interface BenefitTypesSettingsProps {
  onSave: (settings: any) => void;
  isLoading: boolean;
}

interface BenefitType {
  id: number;
  name: string;
  description: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'yearly' | 'one_time';
  eligibility_criteria: string;
  is_active: boolean;
}

const BenefitTypesSettings: React.FC<BenefitTypesSettingsProps> = ({ onSave, isLoading }) => {
  const [benefitTypes, setBenefitTypes] = useState<BenefitType[]>([
    {
      id: 1,
      name: 'Food Basket',
      description: 'Monthly food supplies and essential items',
      amount: 150.00,
      frequency: 'monthly',
      eligibility_criteria: 'Active members with 3+ months membership',
      is_active: true
    },
    {
      id: 2,
      name: 'Medical Aid',
      description: 'Healthcare assistance and medical support',
      amount: 200.00,
      frequency: 'quarterly',
      eligibility_criteria: 'All active members',
      is_active: true
    },
    {
      id: 3,
      name: 'Education Grant',
      description: 'School fee support for members children',
      amount: 300.00,
      frequency: 'yearly',
      eligibility_criteria: 'Members with children in school',
      is_active: true
    }
  ]);

  const [showAddBenefit, setShowAddBenefit] = useState(false);
  const [newBenefit, setNewBenefit] = useState({
    name: '',
    description: '',
    amount: 0,
    frequency: 'monthly' as BenefitType['frequency'],
    eligibility_criteria: '',
    is_active: true
  });

  const handleAddBenefit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBenefitType: BenefitType = {
      ...newBenefit,
      id: Math.max(...benefitTypes.map(bt => bt.id)) + 1,
    };
    setBenefitTypes([...benefitTypes, newBenefitType]);
    setShowAddBenefit(false);
    setNewBenefit({
      name: '',
      description: '',
      amount: 0,
      frequency: 'monthly',
      eligibility_criteria: '',
      is_active: true
    });
  };

  const toggleBenefitStatus = (benefitId: number) => {
    setBenefitTypes(benefitTypes.map(bt => 
      bt.id === benefitId ? { ...bt, is_active: !bt.is_active } : bt
    ));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Benefit Types</h2>
          <p className="text-gray-600 mt-1">Configure welfare benefit programs</p>
        </div>
        <button
          onClick={() => setShowAddBenefit(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
        >
          <span>🎁</span>
          <span>Add Benefit Type</span>
        </button>
      </div>

      {/* Add Benefit Modal */}
      {showAddBenefit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Add New Benefit Type</h3>
                <button
                  onClick={() => setShowAddBenefit(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAddBenefit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Benefit Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newBenefit.name}
                      onChange={(e) => setNewBenefit({ ...newBenefit, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount (GHS) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newBenefit.amount}
                      onChange={(e) => setNewBenefit({ ...newBenefit, amount: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    value={newBenefit.description}
                    onChange={(e) => setNewBenefit({ ...newBenefit, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Frequency *
                    </label>
                    <select
                      required
                      value={newBenefit.frequency}
                      onChange={(e) => setNewBenefit({ ...newBenefit, frequency: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="yearly">Yearly</option>
                      <option value="one_time">One Time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={newBenefit.is_active ? 'active' : 'inactive'}
                      onChange={(e) => setNewBenefit({ ...newBenefit, is_active: e.target.value === 'active' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Eligibility Criteria
                  </label>
                  <textarea
                    value={newBenefit.eligibility_criteria}
                    onChange={(e) => setNewBenefit({ ...newBenefit, eligibility_criteria: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe who is eligible for this benefit..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddBenefit(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  >
                    Add Benefit Type
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefitTypes.map((benefit) => (
          <div key={benefit.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{benefit.name}</h3>
              <button
                onClick={() => toggleBenefitStatus(benefit.id)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  benefit.is_active ? 'bg-green-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    benefit.is_active ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-4">{benefit.description}</p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Amount:</span>
                <span className="font-medium">GHS {benefit.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Frequency:</span>
                <span className="font-medium capitalize">{benefit.frequency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className={`font-medium ${
                  benefit.is_active ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {benefit.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {benefit.eligibility_criteria && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  <strong>Eligibility:</strong> {benefit.eligibility_criteria}
                </p>
              </div>
            )}

            <div className="mt-4 flex space-x-2">
              <button className="text-blue-600 hover:text-blue-900 text-sm">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-900 text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitTypesSettings;