import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { cn } from '@/utils/cn';

const Header = ({ 
  title, 
  subtitle, 
  action, 
  className = '',
  showProjectSelector = true 
}) => {
  const [selectedProject, setSelectedProject] = useState('Product Alpha');

  const projects = [
    { id: 1, name: 'Product Alpha', logo: '🚀' },
    { id: 2, name: 'Beta Platform', logo: '⚡' },
    { id: 3, name: 'Mobile App', logo: '📱' },
  ];

  return (
    <motion.header
      className={cn(
        'bg-white border-b border-gray-200 px-6 py-4',
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {showProjectSelector && (
            <div className="relative">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-medium"
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.name}>
                    {project.logo} {project.name}
                  </option>
                ))}
              </select>
              <ApperIcon 
                name="ChevronDown" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
              />
            </div>
          )}
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
        </div>

        {action && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {action}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;