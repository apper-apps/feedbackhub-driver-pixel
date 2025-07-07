import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  color = 'primary', 
  className = '' 
}) => {
  const colors = {
    primary: 'from-primary-500 to-primary-600',
    accent: 'from-accent-500 to-accent-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <motion.div
      className={cn('card-elevated p-6', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          
          {change !== undefined && (
            <div className="flex items-center mt-2">
              <motion.div
                className={cn(
                  'flex items-center space-x-1 text-sm font-medium',
                  isPositive && 'text-green-600',
                  isNegative && 'text-red-600',
                  !isPositive && !isNegative && 'text-gray-600'
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <ApperIcon 
                  name={isPositive ? 'TrendingUp' : isNegative ? 'TrendingDown' : 'Minus'} 
                  className="w-4 h-4" 
                />
                <span>{Math.abs(change)}%</span>
              </motion.div>
            </div>
          )}
        </div>
        
        <div className={cn(
          'w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center',
          colors[color]
        )}>
          <ApperIcon name={icon} className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;