
interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'payment' | 'benefit' | 'member' | 'system';
}

const RecentActivity: React.FC = () => {
  const activities: Activity[] = [
    {
      id: 1,
      user: 'Sarah Johnson',
      action: 'marked dues as paid',
      target: 'John Doe',
      time: '2 minutes ago',
      type: 'payment'
    },
    {
      id: 2,
      user: 'Mike Chen',
      action: 'updated benefit status',
      target: 'Jane Smith',
      time: '1 hour ago',
      type: 'benefit'
    },
    {
      id: 3,
      user: 'System',
      action: 'sent payment reminders to',
      target: '15 members',
      time: '3 hours ago',
      type: 'system'
    },
    {
      id: 4,
      user: 'Emma Davis',
      action: 'added new member',
      target: 'Robert Wilson',
      time: '5 hours ago',
      type: 'member'
    }
  ];

  const getIcon = (type: Activity['type']): string => {
    switch (type) {
      case 'payment': return '💰';
      case 'benefit': return '🎁';
      case 'member': return '👥';
      case 'system': return '🤖';
      default: return '📝';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
          View All Activity
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm">
              {getIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;