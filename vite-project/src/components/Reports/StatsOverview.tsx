import React from 'react';
import type { ReportData } from '../../pages/Reports';

interface StatsOverviewProps {
  data: ReportData;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ data }) => {
  const stats = [
    {
      title: 'Total Members',
      value: data.total_members.toLocaleString(),
      change: '+4.2%',
      trend: 'up',
      icon: '👥',
      color: 'blue'
    },
    {
      title: 'Active Members',
      value: data.active_members.toLocaleString(),
      change: '+3.8%',
      trend: 'up',
      icon: '✅',
      color: 'green'
    },
    {
      title: 'Collection Rate',
      value: `${data.collection_rate}%`,
      change: '+2.1%',
      trend: 'up',
      icon: '💰',
      color: 'purple'
    },
    {
      title: 'Delivery Rate',
      value: `${data.delivery_rate}%`,
      change: '+1.5%',
      trend: 'up',
      icon: '🎁',
      color: 'pink'
    },
    {
      title: 'Total Revenue',
      value: `GHS ${data.total_revenue.toLocaleString()}`,
      change: '+5.7%',
      trend: 'up',
      icon: '📈',
      color: 'green'
    },
    {
      title: 'Benefits Distributed',
      value: `GHS ${data.benefits_distributed.toLocaleString()}`,
      change: '+6.3%',
      trend: 'up',
      icon: '📦',
      color: 'orange'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <div className={`flex items-center mt-2 ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <span className="text-sm font-medium">
                  {stat.change} from previous period
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-full bg-${stat.color}-100 text-${stat.color}-600 text-xl`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;