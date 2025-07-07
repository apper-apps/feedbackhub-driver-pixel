import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { cn } from '@/utils/cn';

const FilterPanel = ({ 
  filters = {}, 
  onFiltersChange, 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'not-planned', label: 'Not Planned' },
    { value: 'planned', label: 'Planned' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'most-votes', label: 'Most Votes' },
    { value: 'least-votes', label: 'Least Votes' },
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'improvement', label: 'Improvement' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'integration', label: 'Integration' },
    { value: 'other', label: 'Other' },
  ];

  const handleFilterChange = (key, value) => {
    if (onFiltersChange) {
      onFiltersChange({ ...filters, [key]: value });
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.status && filters.status !== 'all') count++;
    if (filters.category && filters.category !== 'all') count++;
    if (filters.sort && filters.sort !== 'newest') count++;
    return count;
  };

  const clearFilters = () => {
    if (onFiltersChange) {
      onFiltersChange({
        status: 'all',
        category: 'all',
        sort: 'newest',
      });
    }
  };

  return (
    <div className={cn('relative', className)}>
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center space-x-2"
      >
        <ApperIcon name="Filter" className="w-4 h-4" />
        <span>Filters</span>
        {getActiveFiltersCount() > 0 && (
          <Badge variant="primary" size="sm">
            {getActiveFiltersCount()}
          </Badge>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 right-0 w-80 bg-white rounded-lg shadow-medium border border-gray-200 z-50"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear all
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={filters.status || 'all'}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category || 'all'}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sort || 'newest'}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterPanel;