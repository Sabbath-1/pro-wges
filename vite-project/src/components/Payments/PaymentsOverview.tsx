import React from 'react';
import type { PaymentStats } from '../../pages/Payments';

interface PaymentsOverviewProps {
  stats: PaymentStats;
}

const PaymentsOverview: React.FC<PaymentsOverviewProps> = ({ stats }) => {
  const statsCards = [
    {
      title: 'Total Collected',
      value: `GHS ${stats.total_collected.toLocaleString()}`,
      change: '+12%',
      trend: 'up',
      icon: '💰',
      color: 'green'
    },
    {
      title: 'Collection Rate',
      value: `${stats.collection_rate}%`,
      change: '+5%',
      trend: 'up',
      icon: '📈',
      color: 'blue'
    },
    {
      title: 'Pending Payments',
      value: stats.pending_payments.toString(),
      change: '-3%',
      trend: 'down',
      icon: '⏳',
      color: 'yellow'
    },
    {
      title: 'Overdue Payments',
      value: stats.overdue_payments.toString(),
      change: '+2%',
      trend: 'up',
      icon: '⚠️',
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

export default PaymentsOverview;