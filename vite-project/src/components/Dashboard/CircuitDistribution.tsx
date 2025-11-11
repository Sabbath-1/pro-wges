
const CircuitDistribution = () => {
  const circuitData = [
    { name: 'Duayaw Nkwanta Circuit', members: 450, color: 'bg-blue-500' },
    { name: 'Yamfo Circuit', members: 320, color: 'bg-green-500' },
    { name: 'Bomaa Circuit', members: 280, color: 'bg-purple-500' },
    { name: 'Ntotroso Circuit', members: 197, color: 'bg-orange-500' }
  ];

  const totalMembers = circuitData.reduce((sum, circuit) => sum + circuit.members, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Member Distribution by Circuit</h3>
      
      <div className="space-y-4">
        {circuitData.map((circuit, index) => {
          const percentage = ((circuit.members / totalMembers) * 100).toFixed(1);
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${circuit.color}`}></div>
                <span className="text-sm font-medium text-gray-700">{circuit.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${circuit.color} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-16 text-right">
                  {circuit.members} ({percentage}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Members</span>
          <span className="text-lg font-bold text-gray-900">{totalMembers.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CircuitDistribution;