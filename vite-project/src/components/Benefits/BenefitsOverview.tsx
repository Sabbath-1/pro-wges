import React from 'react';
import type { BenefitStats } from '../../pages/Benefits';

interface BenefitsOverviewProps {
  stats: BenefitStats;
}

const BenefitsOverview: React.FC<BenefitsOverviewProps> = ({ stats }) => {
  const statsCards = [
    {
      title: 'Total Disbursed',
      value: `GHS ${stats.total_disbursed.toLocaleString()}`,
      change: '+15%',
      trend: 'up',
      icon: '💰',
      color: 'green'
    },
    {
      title: 'Delivery Rate',
      value: `${stats.delivery_rate}%`,
      change: '+8%',
      trend: 'up',
      icon: '📈',
      color: 'blue'
    },
    {
      title: 'Pending Benefits',
      value: stats.pending_benefits.toString(),
      change: '-5%',
      trend: 'down',
      icon: '⏳',
      color: 'yellow'
    },
    {
      title: 'Cancelled Benefits',
      value: stats.cancelled_benefits.toString(),
      change: '+1%',
      trend: 'up',
      icon: '❌',
      color: 'red'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <div className={`flex items-center mt-2 ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <span className="text-sm font-medium">
                  {stat.change} from last month
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-full bg-${stat.color}-100 text-${stat.color}-600`}>
              <span className="text-xl">{stat.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BenefitsOverview;