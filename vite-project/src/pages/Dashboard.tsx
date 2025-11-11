import StatsCards from '../components/Dashboard/StatsCards';
import PaymentChart from '../components/Dashboard/PaymentChart';
import CircuitDistribution from '../components/Dashboard/CircuitDistribution';
import RecentActivity from '../components/Dashboard/RecentActivity';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">GES Welfare Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your welfare program.</p>
      </div>

      {/* Quick Stats Cards */}
      <StatsCards />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentChart />
        <CircuitDistribution />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};

export default Dashboard;