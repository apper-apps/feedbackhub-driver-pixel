import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  title = "Something went wrong",
  message = "We encountered an error while loading the data. Please try again.",
  onRetry,
  className = ""
}) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center max-w-md">
        <motion.div
          className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-white" />
        </motion.div>
        
        <motion.h3
          className="text-lg font-semibold text-gray-900 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>
        
        <motion.p
          className="text-gray-600 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {message}
        </motion.p>
        
        {onRetry && (
          <motion.button
            onClick={onRetry}
            className="btn-primary inline-flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            <span>Try Again</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;