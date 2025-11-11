
const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Welcome back, Admin! 👋
          </h2>
          <p className="text-sm text-gray-600">
            Here's your welfare program overview
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <span className="text-lg">🔔</span>
          </button>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;