import React from 'react';
import type { BenefitType } from '../../pages/Benefits';

// Define the specific status type
type BenefitStatus = 'delivered' | 'pending' | 'cancelled' | 'all';

interface BenefitsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatus: BenefitStatus;
  onStatusChange: (value: BenefitStatus) => void;
  selectedCircuit: string;
  onCircuitChange: (value: string) => void;
  selectedBenefitType: string;
  onBenefitTypeChange: (value: string) => void;
  circuits: string[];
  benefitTypes: BenefitType[];
  onDisburseBenefit: () => void;
  benefitCount: number;
}

const BenefitsHeader: React.FC<BenefitsHeaderProps> = ({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedCircuit,
  onCircuitChange,
  selectedBenefitType,
  onBenefitTypeChange,
  circuits,
  benefitTypes,
  onDisburseBenefit,
  benefitCount
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Benefits Management</h1>
          <p className="text-gray-600 mt-1">
            {benefitCount} {benefitCount === 1 ? 'benefit' : 'benefits'} found
          </p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search benefits..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as BenefitStatus)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="delivered">Delivered</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Disburse Benefit Button */}
          <button
            onClick={onDisburseBenefit}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
          >
            <span>🎁</span>
            <span>Disburse Benefit</span>
          </button>
        </div>
      </div>

      {/* Secondary Filters */}
      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Circuit
          </label>
          <select
            value={selectedCircuit}
            onChange={(e) => onCircuitChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="all">All Circuits</option>
            {circuits.map(circuit => (
              <option key={circuit} value={circuit}>{circuit}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Benefit Type
          </label>
          <select
            value={selectedBenefitType}
            onChange={(e) => onBenefitTypeChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="all">All Types</option>
            {benefitTypes.map(type => (
              <option key={type.id} value={type.name}>{type.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BenefitsHeader;