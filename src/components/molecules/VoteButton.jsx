import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { cn } from '@/utils/cn';

const VoteButton = ({ 
  votes = 0, 
  hasVoted = false, 
  onVote, 
  className = '',
  disabled = false 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleVote = async () => {
    if (disabled || isAnimating) return;
    
    setIsAnimating(true);
    if (onVote) {
      await onVote();
    }
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <motion.button
      onClick={handleVote}
      disabled={disabled || isAnimating}
      className={cn(
        'flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200',
        'border-2 min-w-[60px] h-16',
        hasVoted 
          ? 'border-primary-500 bg-primary-50 text-primary-700' 
          : 'border-gray-300 bg-white text-gray-600 hover:border-primary-300 hover:bg-primary-50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      <motion.div
        animate={isAnimating ? { rotate: 360 } : {}}
        transition={{ duration: 0.3 }}
      >
        <ApperIcon 
          name={hasVoted ? "ChevronUp" : "ChevronUp"} 
          className="w-4 h-4" 
        />
      </motion.div>
      <motion.span
        className="text-xs font-medium mt-1"
        key={votes}
        initial={{ scale: 1 }}
        animate={{ scale: isAnimating ? 1.2 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {votes}
      </motion.span>
    </motion.button>
  );
};

export default VoteButton;