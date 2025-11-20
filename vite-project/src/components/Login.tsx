import GhLogo from '../assets/Ghana Crest.svg'

function Login() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl p-8 bg-white mx-auto shadow-lg">
        <div className="mb-2 w-full text-center">
          <img
            className="mx-auto h-auto w-20"
            src={GhLogo}
            alt="Ghana Crest"
          />
        </div>

        <h1 className="mb-2 text-center font-semibold text-2xl text-gray-900 font-poppins">
          Official Welfare Portal
        </h1>

        <p className="mb-6 text-center text-gray-600">
          Log in to access your dashboard
        </p>

        <form method='POST' action="/login" className="flex flex-col gap-4 text-left">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="yourmail@example.com" 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 text-base transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="••••••••" 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 text-base transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 w-4 h-4 bg-white border border-gray-300 rounded text-blue-600 focus:ring-blue-500"
              />
              Remember me
            </label>
            <a 
              href="#" 
              className="text-blue-600 no-underline transition-colors duration-200 hover:text-blue-800 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md border-none text-base font-semibold cursor-pointer transition-colors duration-200 hover:bg-blue-700 mb-4"
          >
            Login
          </button>
        </form>

        <footer className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a 
            href="#" 
            className="text-blue-600 no-underline transition-colors duration-200 hover:text-blue-800 hover:underline"
          >
            Contact admin
          </a>
        </footer>
      </div>
    </div>
  )
}

export default Login