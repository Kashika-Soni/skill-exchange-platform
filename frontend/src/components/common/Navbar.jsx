import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-600">
          SkillExchange
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm text-gray-700 hover:text-indigo-600 font-medium">
                Dashboard
              </Link>
              <Link to="/inbox" className="text-sm text-gray-700 hover:text-indigo-600 font-medium">
                Inbox
              </Link>
              <Link to="/profile" className="text-sm text-gray-700 hover:text-indigo-600 font-medium">
                Profile
              </Link>
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <span className="text-sm text-gray-600 font-medium">{user?.name || 'User'}</span>
                <button
                  onClick={handleLogout}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-700 hover:text-indigo-600 font-medium">
                Log In
              </Link>
              <Link
                to="/register"
                className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}