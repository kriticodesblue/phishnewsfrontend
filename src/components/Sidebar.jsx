import { NavLink } from 'react-router-dom';
import { FaHome, FaShieldAlt, FaDesktop, FaBuilding, FaGlobe, FaFlask, FaHeart, FaEye, FaChartLine, FaBookmark, FaCog, FaTh } from 'react-icons/fa';

const categories = [
  { id: 'all', label: 'All News', icon: FaHome, color: 'text-cyan-500' },
  { id: 'cybersecurity', label: 'Cybersecurity', icon: FaShieldAlt, color: 'text-red-500' },
  { id: 'technology', label: 'Technology', icon: FaDesktop, color: 'text-blue-500' },
  { id: 'business', label: 'Business', icon: FaBuilding, color: 'text-green-500' },
  { id: 'politics', label: 'Politics', icon: FaGlobe, color: 'text-purple-500' },
  { id: 'science', label: 'Science', icon: FaFlask, color: 'text-yellow-500' },
  { id: 'health', label: 'Health', icon: FaHeart, color: 'text-pink-500' },
  { id: 'world', label: 'World', icon: FaEye, color: 'text-indigo-500' },
];

const quickActions = [
  { id: 'trending', label: 'Trending', icon: FaChartLine },
  { id: 'saved', label: 'Saved Articles', icon: FaBookmark },
  { id: 'settings', label: 'Settings', icon: FaCog },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-6">
        {/* View All Categories Button */}
        <NavLink
          to="/categories"
          className="flex items-center gap-3 w-full p-3 mb-6 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          <FaTh className="text-sm" />
          <span className="font-medium">View All Categories</span>
          <span className="ml-auto text-sm">›</span>
        </NavLink>

        {/* Categories Section */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
            CATEGORIES
          </h3>
          <nav className="space-y-1">
            {categories.map((category) => (
              <NavLink
                key={category.id}
                to={category.id === 'all' ? '/' : `/search?category=${category.id}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive && category.id === 'all'
                      ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`
                }
                end={category.id === 'all'}
              >
                <category.icon className={`text-sm ${category.color}`} />
                <span>{category.label}</span>
                <span className="ml-auto text-xs">›</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Quick Actions Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
            QUICK ACTIONS
          </h3>
          <nav className="space-y-1">
            {quickActions.map((action) => (
              <NavLink
                key={action.id}
                to={`/${action.id}`}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <action.icon className="text-sm text-gray-500" />
                <span>{action.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}