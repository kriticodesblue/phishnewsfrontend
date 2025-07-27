import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaShieldAlt, FaSun, FaMoon, FaBell, FaBookmark, FaCog, FaUser, FaSearch } from 'react-icons/fa';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/categories', label: 'Categories' },
  { to: '/personalized', label: 'Trending' },
  { to: '/bookmarks', label: 'Saved' },
];

export default function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
            <FaShieldAlt className="text-white text-sm" />
          </div>
          <span className="font-semibold text-gray-900 dark:text-white text-lg">phish defense.</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium transition-colors relative ${
                  isActive 
                    ? 'text-cyan-500' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`
              }
              end={item.to === '/'}
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500"></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Search and Actions */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search news..."
              className="w-80 pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
            </button>
            
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <FaBell className="text-sm" />
            </button>
            
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <FaBookmark className="text-sm" />
            </button>
            
            <NavLink
              to="/settings"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Settings"
            >
              <FaCog className="text-sm" />
            </NavLink>
            
            {/* Profile */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaUser className="text-sm" />
              </button>
            ) : (
              <NavLink
                to="/login"
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaUser className="text-sm" />
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}