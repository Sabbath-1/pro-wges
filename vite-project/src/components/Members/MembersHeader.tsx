import React from 'react';

interface MembersHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCircuit: string;
  onCircuitChange: (value: string) => void;
  circuits: string[];
  onAddMember: () => void;
  memberCount: number;
}

const MembersHeader: React.FC<MembersHeaderProps> = ({
  searchTerm,
  onSearchChange,
  selectedCircuit,
  onCircuitChange,
  circuits,
  onAddMember,
  memberCount
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members Management</h1>
          <p className="text-gray-600 mt-1">
            {memberCount} {memberCount === 1 ? 'member' : 'members'} found
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
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
            />
          </div>

          {/* Circuit Filter */}
          <select
            value={selectedCircuit}
            onChange={(e) => onCircuitChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Circuits</option>
            {circuits.map(circuit => (
              <option key={circuit} value={circuit}>{circuit}</option>
            ))}
          </select>

          {/* Add Member Button */}
          <button
            onClick={onAddMember}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Member</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembersHeader;