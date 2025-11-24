import React from 'react';
import type { ChartData } from '../../pages/Reports';

interface ChartsSectionProps {
  membershipChartData: ChartData;
  financialChartData: ChartData;
  performanceChartData: ChartData;
  circuitDistribution: Array<{ circuit: string; members: number; percentage: number }>;
  benefitDistribution: Array<{ type: string; count: number; amount: number }>;
}

const ChartsSection: React.FC<ChartsSectionProps> = ({
  circuitDistribution,
  benefitDistribution
}) => {
  // Simple bar chart component
  const BarChart: React.FC<{ data: Array<{ label: string; value: number; color: string }>; title: string }> = ({ data, title }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-24 text-sm text-gray-600 truncate">{item.label}</div>
              <div className="flex-1">
                <div className="bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-16 text-sm font-medium text-gray-900 text-right">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Simple line chart component
  const LineChart: React.FC<{ data: ChartData; title: string }> = ({ data, title }) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="space-y-4">
          {data.datasets.map((dataset, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: dataset.borderColor }}
              ></div>
              <span className="text-sm text-gray-600">{dataset.label}</span>
              <div className="flex-1 flex space-x-1 items-end h-8">
                {dataset.data.map((value, valueIndex) => (
                  <div
                    key={valueIndex}
                    className="flex-1 bg-gray-100 rounded-t relative group"
                    style={{ height: `${(value / Math.max(...dataset.data)) * 100}%` }}
                  >
                    <div 
                      className="absolute bottom-0 left-0 right-0 rounded-t transition-all duration-300 hover:opacity-80"
                      style={{ 
                        backgroundColor: dataset.backgroundColor.replace('0.1', '0.6'),
                        height: '100%'
                      }}
                    ></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            {data.labels.map((label, index) => (
              <div key={index} className="text-center">
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const circuitData = circuitDistribution.map((circuit, index) => ({
    label: circuit.circuit,
    value: circuit.members,
    color: ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'][index % 4]
  }));

  const benefitData = benefitDistribution.map((benefit, index) => ({
    label: benefit.type,
    value: benefit.count,
    color: ['bg-pink-500', 'bg-yellow-500', 'bg-indigo-500', 'bg-red-500'][index % 4]
  }));

  // Mock chart data for the line charts
  const mockMembershipChart: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Total Members',
        data: [1247, 1289, 1320, 1355],
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgb(59, 130, 246)',
      }
    ]
  };

  const mockFinancialChart: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Revenue (GHS)',
        data: [27575, 28625, 29500, 30250],
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderColor: 'rgb(139, 92, 246)',
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Membership Trends */}
      <LineChart 
        data={mockMembershipChart} 
        title="Membership Growth Trend" 
      />

      {/* Financial Performance */}
      <LineChart 
        data={mockFinancialChart} 
        title="Revenue Trend" 
      />

      {/* Circuit Distribution */}
      <BarChart 
        data={circuitData} 
        title="Member Distribution by Circuit" 
      />

      {/* Benefit Distribution */}
      <BarChart 
        data={benefitData} 
        title="Benefits Distribution by Type" 
      />

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Collection Rate by Circuit</h4>
            <div className="space-y-3">
              {circuitDistribution.map((circuit, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{circuit.circuit}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${75 + index * 5}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">
                      {75 + index * 5}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Delivery Rate by Benefit Type</h4>
            <div className="space-y-3">
              {benefitDistribution.map((benefit, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{benefit.type}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${80 + index * 3}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">
                      {80 + index * 3}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;