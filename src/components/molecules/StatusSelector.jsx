import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import { cn } from '@/utils/cn';

const StatusSelector = ({ 
  currentStatus = 'not-planned', 
  onStatusChange, 
  className = '',
  disabled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const statuses = [
    { value: 'not-planned', label: 'Not Planned', variant: 'default' },
    { value: 'planned', label: 'Planned', variant: 'planned' },
    { value: 'in-progress', label: 'In Progress', variant: 'in-progress' },
    { value: 'completed', label: 'Completed', variant: 'completed' },
  ];

  const currentStatusData = statuses.find(s => s.value === currentStatus);

  const handleStatusChange = (newStatus) => {
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
    setIsOpen(false);
  };

  return (
    <div className={cn('relative', className)}>
      <motion.button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'flex items-center space-x-2 p-2 rounded-lg transition-all duration-200',
          'hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed',
          isOpen && 'bg-gray-50'
        )}
        whileHover={disabled ? {} : { scale: 1.02 }}
      >
        <Badge variant={currentStatusData?.variant}>
          {currentStatusData?.label}
        </Badge>
        <ApperIcon 
          name="ChevronDown" 
          className={cn(
            'w-4 h-4 text-gray-400 transition-transform duration-200',
            isOpen && 'rotate-180'
          )} 
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-medium border border-gray-200 z-50"
          >
            <div className="p-2">
              {statuses.map((status) => (
                <motion.button
                  key={status.value}
                  onClick={() => handleStatusChange(status.value)}
                  className={cn(
                    'w-full flex items-center space-x-2 p-2 rounded-lg transition-all duration-200',
                    'hover:bg-gray-50 text-left',
                    status.value === currentStatus && 'bg-primary-50'
                  )}
                  whileHover={{ scale: 1.02 }}
                >
                  <Badge variant={status.variant}>
                    {status.label}
                  </Badge>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatusSelector;