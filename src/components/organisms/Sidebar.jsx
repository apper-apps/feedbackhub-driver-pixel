import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const Sidebar = ({ className = '' }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: 'BarChart3' },
    { path: '/ideas', label: 'Ideas', icon: 'Lightbulb' },
    { path: '/roadmap', label: 'Roadmap', icon: 'Calendar' },
    { path: '/changelog', label: 'Changelog', icon: 'FileText' },
    { path: '/reviews', label: 'Reviews', icon: 'Star' },
    { path: '/settings', label: 'Settings', icon: 'Settings' },
  ];

  const NavItem = ({ item, onClick = () => {} }) => (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) => cn(
        'flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200',
        'hover:bg-primary-50 hover:text-primary-700',
        isActive 
          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-soft' 
          : 'text-gray-700'
      )}
    >
      <ApperIcon name={item.icon} className="w-5 h-5" />
      <span className="font-medium">{item.label}</span>
    </NavLink>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-medium border border-gray-200"
      >
        <ApperIcon name="Menu" className="w-6 h-6 text-gray-600" />
      </button>

      {/* Desktop Sidebar */}
      <div className={cn(
        'hidden lg:block w-64 bg-white border-r border-gray-200 h-full',
        className
      )}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <ApperIcon name="MessageSquare" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">FeedbackHub</h1>
              <p className="text-xs text-gray-500">Product Feedback</p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="lg:hidden fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200 z-50"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                      <ApperIcon name="MessageSquare" className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold gradient-text">FeedbackHub</h1>
                      <p className="text-xs text-gray-500">Product Feedback</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ApperIcon name="X" className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <NavItem 
                      key={item.path} 
                      item={item} 
                      onClick={() => setIsMobileOpen(false)}
                    />
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;