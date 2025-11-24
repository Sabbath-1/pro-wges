import { NavLink } from 'react-router-dom';
import GhLogo from '../../assets/Ghana Crest.svg';

const Sidebar: React.FC = () => {
  const menuItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/members', icon: '👥', label: 'Members' },
    { path: '/payments', icon: '💰', label: 'Payments' },
    { path: '/benefits', icon: '🎁', label: 'Benefits' },
    { path: '/reports', icon: '📊', label: 'Reports' },
    { path: '/settings', icon: '⚙️', label: 'Settings' }
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800 flex items-center">
          <img src={GhLogo} alt="Ghana Crest" className="inline-block w-8 h-8 mr-2" /> 
          Welfare Portal
        </h1>
      </div>
      
      <nav className="mt-6 px-4">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;