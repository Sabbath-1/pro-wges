import React, { useState, useEffect } from 'react';
import type { Benefit, BenefitType } from '../../pages/Benefits';

interface BenefitModalProps {
  isOpen: boolean;
  onClose: () => void;
  benefit: Benefit | null;
  circuits: string[];
  benefitTypes: BenefitType[];
}

const BenefitModal: React.FC<BenefitModalProps> = ({ isOpen, onClose, benefit, circuits, benefitTypes }) => {
  const [formData, setFormData] = useState({
    member_name: '',
    member_circuit: '',
    benefit_type_id: '',
    amount: 0,
    date_disbursed: new Date().toISOString().split('T')[0],
    scheduled_date: new Date().toISOString().split('T')[0],
    status: 'pending' as 'delivered' | 'pending' | 'cancelled',
    notes: ''
  });

  useEffect(() => {
    if (benefit) {
      setFormData({
        member_name: benefit.member_name,
        member_circuit: benefit.member_circuit,
        benefit_type_id: benefit.benefit_type_id.toString(),
        amount: benefit.amount,
        date_disbursed: benefit.date_disbursed || new Date().toISOString().split('T')[0],
        scheduled_date: benefit.scheduled_date,
        status: benefit.status,
        notes: benefit.notes || ''
      });
    } else {
      const defaultBenefitType = benefitTypes[0];
      setFormData({
        member_name: '',
        member_circuit: circuits[0] || '',
        benefit_type_id: defaultBenefitType?.id.toString() || '',
        amount: defaultBenefitType?.amount || 0,
        date_disbursed: new Date().toISOString().split('T')[0],
        scheduled_date: new Date().toISOString().split('T')[0],
        status: 'pending',
        notes: ''
      });
    }
  }, [benefit, circuits, benefitTypes]);

  // Update amount when benefit type changes
  useEffect(() => {
    if (formData.benefit_type_id) {
      const selectedType = benefitTypes.find(bt => bt.id.toString() === formData.benefit_type_id);
      if (selectedType) {
        setFormData(prev => ({ ...prev, amount: selectedType.amount }));
      }
    }
  }, [formData.benefit_type_id, benefitTypes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would make API call to save the benefit
    console.log('Saving benefit:', formData);
    onClose();
  };

  if (!isOpen) return null;

  const selectedBenefitType = benefitTypes.find(bt => bt.id.toString() === formData.benefit_type_id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {benefit ? 'Edit Benefit' : 'Disburse New Benefit'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Member Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.member_name}
                  onChange={(e) => setFormData({ ...formData, member_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search member..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Circuit *
                </label>
                <select
                  required
                  value={formData.member_circuit}
                  onChange={(e) => setFormData({ ...formData, member_circuit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select circuit</option>
                  {circuits.map(circuit => (
                    <option key={circuit} value={circuit}>{circuit}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Benefit Type *
              </label>
              <select
                required
                value={formData.benefit_type_id}
                onChange={(e) => setFormData({ ...formData, benefit_type_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select benefit type</option>
                {benefitTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name} - GHS {type.amount} ({type.frequency})
                  </option>
                ))}
              </select>
              {selectedBenefitType && (
                <p className="text-sm text-gray-600 mt-1">
                  {selectedBenefitType.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (GHS) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Scheduled Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.scheduled_date}
                  onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Disbursed Date
                </label>
                <input
                  type="date"
                  value={formData.date_disbursed}
                  onChange={(e) => setFormData({ ...formData, date_disbursed: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Additional notes about this benefit disbursement..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
              >
                {benefit ? 'Update' : 'Disburse'} Benefit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BenefitModal;