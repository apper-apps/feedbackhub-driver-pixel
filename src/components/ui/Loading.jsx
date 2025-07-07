import { motion } from 'framer-motion';

const Loading = ({ type = 'default', className = '' }) => {
  if (type === 'dashboard') {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-lg shadow-soft border border-gray-200 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="shimmer h-4 w-24 rounded mb-2"></div>
              <div className="shimmer h-8 w-16 rounded"></div>
            </motion.div>
          ))}
        </div>
        
        {/* Chart Area */}
        <motion.div
          className="bg-white rounded-lg shadow-soft border border-gray-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="shimmer h-6 w-48 rounded mb-4"></div>
          <div className="shimmer h-64 w-full rounded"></div>
        </motion.div>
        
        {/* Recent Activity */}
        <motion.div
          className="bg-white rounded-lg shadow-soft border border-gray-200 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="shimmer h-6 w-32 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="shimmer h-10 w-10 rounded-full"></div>
                <div className="flex-1">
                  <div className="shimmer h-4 w-3/4 rounded mb-1"></div>
                  <div className="shimmer h-3 w-1/2 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }
  
  if (type === 'cards') {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-lg shadow-soft border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="shimmer h-5 w-3/4 rounded mb-2"></div>
                <div className="shimmer h-4 w-full rounded mb-1"></div>
                <div className="shimmer h-4 w-2/3 rounded"></div>
              </div>
              <div className="shimmer h-8 w-12 rounded"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="shimmer h-6 w-16 rounded-full"></div>
              <div className="shimmer h-4 w-20 rounded"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
  
  if (type === 'kanban') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-gray-50 rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="shimmer h-6 w-24 rounded mb-4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="bg-white rounded-lg shadow-soft border border-gray-200 p-4">
                  <div className="shimmer h-4 w-3/4 rounded mb-2"></div>
                  <div className="shimmer h-3 w-full rounded mb-1"></div>
                  <div className="shimmer h-3 w-1/2 rounded"></div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
  
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full animate-ping opacity-20"></div>
        </div>
        <div className="text-center">
          <div className="shimmer h-4 w-24 rounded mb-2"></div>
          <div className="shimmer h-3 w-32 rounded"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Loading;