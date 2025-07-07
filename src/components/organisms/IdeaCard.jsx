import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import VoteButton from '@/components/molecules/VoteButton';
import StatusSelector from '@/components/molecules/StatusSelector';
import { cn } from '@/utils/cn';

const IdeaCard = ({ 
  idea, 
  onVote, 
  onStatusChange, 
  onComment, 
  className = '',
  showStatusSelector = true 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleVote = async () => {
    if (onVote) {
      await onVote(idea.Id);
    }
  };

  const handleStatusChange = (newStatus) => {
    if (onStatusChange) {
      onStatusChange(idea.Id, newStatus);
    }
  };

  const handleComment = () => {
    if (onComment) {
      onComment(idea.Id);
    }
  };

  return (
    <motion.div
      className={cn('card p-6', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start space-x-4">
        <VoteButton
          votes={idea.votes}
          hasVoted={idea.hasVoted}
          onVote={handleVote}
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 leading-tight">
              {idea.title}
            </h3>
            {showStatusSelector && (
              <StatusSelector
                currentStatus={idea.status}
                onStatusChange={handleStatusChange}
              />
            )}
          </div>
          
          <p className={cn(
            'text-gray-600 mb-4',
            !isExpanded && 'line-clamp-3'
          )}>
            {idea.description}
          </p>
          
          {idea.description.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium mb-4"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant={idea.status}>
                {idea.status.replace('-', ' ')}
              </Badge>
              
              <button
                onClick={handleComment}
                className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 transition-colors duration-200"
              >
                <ApperIcon name="MessageCircle" className="w-4 h-4" />
                <span className="text-sm">{idea.commentCount || 0}</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <ApperIcon name="Clock" className="w-3 h-3" />
              <span>
                {formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IdeaCard;