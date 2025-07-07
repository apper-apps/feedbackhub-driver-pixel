import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from 'react-toastify';
import Header from '@/components/organisms/Header';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { changelogService } from '@/services/api/changelogService';

const Changelog = () => {
  const [changelog, setChangelog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadChangelog = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await changelogService.getAll();
      setChangelog(data);
    } catch (err) {
      setError('Failed to load changelog');
      console.error('Changelog error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChangelog();
  }, []);

  const handleCreateEntry = () => {
    // Placeholder for create changelog entry
    toast.info('Create changelog entry coming soon!');
  };

  const getVersionType = (version) => {
    if (version.includes('beta')) return 'beta';
    if (version.includes('alpha')) return 'alpha';
    const [major, minor, patch] = version.split('.').map(Number);
    if (patch === 0 && minor === 0) return 'major';
    if (patch === 0) return 'minor';
    return 'patch';
  };

  const getVersionBadgeVariant = (type) => {
    switch (type) {
      case 'major':
        return 'primary';
      case 'minor':
        return 'accent';
      case 'patch':
        return 'default';
      case 'beta':
        return 'planned';
      case 'alpha':
        return 'in-progress';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <Header title="Changelog" subtitle="Track product updates and releases" />
        <div className="flex-1 p-6">
          <Loading type="cards" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <Header title="Changelog" subtitle="Track product updates and releases" />
        <div className="flex-1 p-6">
          <Error 
            title="Failed to load changelog"
            message={error}
            onRetry={loadChangelog}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Header 
        title="Changelog" 
        subtitle="Track product updates and releases"
        action={
          <Button
            onClick={handleCreateEntry}
            className="inline-flex items-center space-x-2"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            <span>New Entry</span>
          </Button>
        }
      />
      
      <div className="flex-1 p-6 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {changelog.length === 0 ? (
            <Empty
              title="No changelog entries"
              message="Start documenting your product updates and releases."
              actionLabel="Create Entry"
              onAction={handleCreateEntry}
              icon="FileText"
            />
          ) : (
            <div className="space-y-6">
              {changelog.map((entry, index) => {
                const versionType = getVersionType(entry.version);
                
                return (
                  <motion.div
                    key={entry.Id}
                    className="card p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Badge variant={getVersionBadgeVariant(versionType)} size="lg">
                          v{entry.version}
                        </Badge>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {entry.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <ApperIcon name="Calendar" className="w-4 h-4" />
                        <span>{format(new Date(entry.publishedAt), 'MMM d, yyyy')}</span>
                        <span>•</span>
                        <span>{formatDistanceToNow(new Date(entry.publishedAt), { addSuffix: true })}</span>
                      </div>
                    </div>
                    
                    <div className="prose prose-sm max-w-none">
                      <div 
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: entry.content.replace(/\n/g, '<br>') }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Changelog;