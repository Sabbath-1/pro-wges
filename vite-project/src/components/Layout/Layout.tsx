import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64"> {/* ml-64 to account for sidebar width */}
        <Navbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;