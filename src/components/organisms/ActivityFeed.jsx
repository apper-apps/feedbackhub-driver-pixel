import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import { cn } from '@/utils/cn';

const ActivityFeed = ({ activities = [], className = '' }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'idea_created':
        return 'Lightbulb';
      case 'idea_voted':
        return 'ChevronUp';
      case 'idea_commented':
        return 'MessageCircle';
      case 'status_changed':
        return 'GitBranch';
      case 'changelog_published':
        return 'FileText';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'idea_created':
        return 'text-blue-600 bg-blue-100';
      case 'idea_voted':
        return 'text-green-600 bg-green-100';
      case 'idea_commented':
        return 'text-purple-600 bg-purple-100';
      case 'status_changed':
        return 'text-orange-600 bg-orange-100';
      case 'changelog_published':
        return 'text-indigo-600 bg-indigo-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getActivityDescription = (activity) => {
    switch (activity.type) {
      case 'idea_created':
        return `New idea "${activity.ideaTitle}" was submitted`;
      case 'idea_voted':
        return `"${activity.ideaTitle}" received ${activity.voteCount} votes`;
      case 'idea_commented':
        return `New comment on "${activity.ideaTitle}"`;
      case 'status_changed':
        return `"${activity.ideaTitle}" status changed to ${activity.newStatus}`;
      case 'changelog_published':
        return `Changelog ${activity.version} was published`;
      default:
        return activity.description || 'Activity occurred';
    }
  };

  if (activities.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <ApperIcon name="Activity" className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">No recent activity</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {activities.map((activity, index) => (
        <motion.div
          key={activity.Id}
          className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-soft border border-gray-200 hover:shadow-medium transition-all duration-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center',
            getActivityColor(activity.type)
          )}>
            <ApperIcon name={getActivityIcon(activity.type)} className="w-4 h-4" />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900 mb-1">
              {getActivityDescription(activity)}
            </p>
            
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <ApperIcon name="Clock" className="w-3 h-3" />
              <span>
                {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
              </span>
              
              {activity.ideaStatus && (
                <>
                  <span>•</span>
                  <Badge variant={activity.ideaStatus} size="sm">
                    {activity.ideaStatus.replace('-', ' ')}
                  </Badge>
                </>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ActivityFeed;