import React from 'react';

// Define the specific status type
type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'all';

interface PaymentsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatus: PaymentStatus;
  onStatusChange: (value: PaymentStatus) => void;
  selectedCircuit: string;
  onCircuitChange: (value: string) => void;
  selectedPeriod: string;
  onPeriodChange: (value: string) => void;
  circuits: string[];
  periods: string[];
  onRecordPayment: () => void;
  paymentCount: number;
}

const PaymentsHeader: React.FC<PaymentsHeaderProps> = ({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedCircuit,
  onCircuitChange,
  selectedPeriod,
  onPeriodChange,
  circuits,
  periods,
  onRecordPayment,
  paymentCount
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments Management</h1>
          <p className="text-gray-600 mt-1">
            {paymentCount} {paymentCount === 1 ? 'payment' : 'payments'} found
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
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as PaymentStatus)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>

          {/* Record Payment Button */}
          <button
            onClick={onRecordPayment}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
          >
            <span>💰</span>
            <span>Record Payment</span>
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
            Period
          </label>
          <select
            value={selectedPeriod}
            onChange={(e) => onPeriodChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="all">All Periods</option>
            {periods.map(period => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PaymentsHeader;