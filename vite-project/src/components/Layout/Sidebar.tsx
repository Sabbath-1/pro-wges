import GhLogo from '../../assets/Ghana Crest.svg'

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: '🏠', label: 'Dashboard' },
    { icon: '👥', label: 'Members' },
    { icon: '💰', label: 'Payments' },
    { icon: '🎁', label: 'Benefits' },
    { icon: '📊', label: 'Reports' },
    { icon: '⚙️', label: 'Settings' }
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800"> <img src={GhLogo} alt="Ghana Crest" className="inline-block w-10 h-10 mr-1" /> Welfare Portal</h1>
      </div>
      
      <nav className="mt-6 px-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 w-full text-left text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;