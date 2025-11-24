import React, { useState } from 'react';

interface CircuitSettingsProps {
  onSave: (settings: any) => void;
  isLoading: boolean;
}

interface Circuit {
  id: number;
  name: string;
  description: string;
  coordinator: string;
  member_count: number;
  is_active: boolean;
}

const CircuitSettings: React.FC<CircuitSettingsProps> = ({ onSave, isLoading }) => {
  const [circuits, setCircuits] = useState<Circuit[]>([
    { id: 1, name: 'Circuit A', description: 'Downtown area members', coordinator: 'Sarah Johnson', member_count: 450, is_active: true },
    { id: 2, name: 'Circuit B', description: 'Uptown district', coordinator: 'Mike Chen', member_count: 320, is_active: true },
    { id: 3, name: 'Circuit C', description: 'Suburban members', coordinator: 'Emma Davis', member_count: 280, is_active: true },
    { id: 4, name: 'Circuit D', description: 'Rural communities', coordinator: 'Not assigned', member_count: 197, is_active: false },
  ]);

  const [showAddCircuit, setShowAddCircuit] = useState(false);
  const [newCircuit, setNewCircuit] = useState({
    name: '',
    description: '',
    coordinator: '',
    is_active: true
  });

  const handleAddCircuit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCircuitItem: Circuit = {
      ...newCircuit,
      id: Math.max(...circuits.map(c => c.id)) + 1,
      member_count: 0
    };
    setCircuits([...circuits, newCircuitItem]);
    setShowAddCircuit(false);
    setNewCircuit({
      name: '',
      description: '',
      coordinator: '',
      is_active: true
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Circuit Management</h2>
          <p className="text-gray-600 mt-1">Manage member circuits and coordinators</p>
        </div>
        <button
          onClick={() => setShowAddCircuit(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
        >
          <span>🗺️</span>
          <span>Add Circuit</span>
        </button>
      </div>

      {/* Add Circuit Modal */}
      {showAddCircuit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Add New Circuit</h3>
                <button
                  onClick={() => setShowAddCircuit(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAddCircuit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Circuit Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCircuit.name}
                    onChange={(e) => setNewCircuit({ ...newCircuit, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newCircuit.description}
                    onChange={(e) => setNewCircuit({ ...newCircuit, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coordinator
                  </label>
                  <input
                    type="text"
                    value={newCircuit.coordinator}
                    onChange={(e) => setNewCircuit({ ...newCircuit, coordinator: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Assign a circuit coordinator"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newCircuit.is_active}
                    onChange={(e) => setNewCircuit({ ...newCircuit, is_active: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Active Circuit
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddCircuit(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Add Circuit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Circuits Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Circuit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coordinator
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Members
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {circuits.map((circuit) => (
              <tr key={circuit.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{circuit.name}</div>
                    <div className="text-sm text-gray-500">{circuit.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {circuit.coordinator}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {circuit.member_count.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    circuit.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {circuit.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Circuit Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">{circuits.length}</div>
          <div className="text-sm text-blue-600 font-medium">Total Circuits</div>
        </div>
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-green-600">
            {circuits.filter(c => c.is_active).length}
          </div>
          <div className="text-sm text-green-600 font-medium">Active Circuits</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {circuits.reduce((sum, circuit) => sum + circuit.member_count, 0).toLocaleString()}
          </div>
          <div className="text-sm text-purple-600 font-medium">Total Members</div>
        </div>
      </div>
    </div>
  );
};

export default CircuitSettings;