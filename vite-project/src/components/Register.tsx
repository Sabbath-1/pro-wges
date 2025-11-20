import { Link } from 'react-router';
import GhLogo from '../assets/Ghana Crest.svg';

export default function Register() {
    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="mb-2 w-full text-center">
          <img
            className="mx-auto h-auto w-20"
            src={GhLogo}
            alt="Ghana Crest"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Welfare Portal</h2>
        <p className="mb-6 text-center text-gray-600">
          Register to access your dashboard
        </p>
        <form method='POST' action="/register" className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input required
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
            </div>
            <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input required
              type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
            />
            </div>
            <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input required
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
            />
            </div>
            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
            Register
            </button>
        </form>
        <footer className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to='/Login' 
            className="text-blue-600 no-underline transition-colors duration-200 hover:text-blue-800 hover:underline"
          >
            Login
          </Link>
        </footer>
      </div>
    </div>
  );
}