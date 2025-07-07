import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Header from '@/components/organisms/Header';
import IdeaCard from '@/components/organisms/IdeaCard';
import CreateIdeaModal from '@/components/organisms/CreateIdeaModal';
import FilterPanel from '@/components/organisms/FilterPanel';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { ideaService } from '@/services/api/ideaService';

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    sort: 'newest',
  });
  const [showCreateModal, setShowCreateModal] = useState(false);

  const loadIdeas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ideaService.getAll();
      setIdeas(data);
      setFilteredIdeas(data);
    } catch (err) {
      setError('Failed to load ideas');
      console.error('Ideas error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIdeas();
  }, []);

  useEffect(() => {
    let filtered = [...ideas];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(idea =>
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(idea => idea.status === filters.status);
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(idea => idea.category === filters.category);
    }

    // Apply sorting
    switch (filters.sort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'most-votes':
        filtered.sort((a, b) => b.votes - a.votes);
        break;
      case 'least-votes':
        filtered.sort((a, b) => a.votes - b.votes);
        break;
      default:
        break;
    }

    setFilteredIdeas(filtered);
  }, [ideas, searchTerm, filters]);

  const handleCreateIdea = async (ideaData) => {
    try {
      await ideaService.create(ideaData);
      await loadIdeas();
      toast.success('Idea created successfully!');
    } catch (err) {
      toast.error('Failed to create idea');
      throw err;
    }
  };

  const handleVote = async (ideaId) => {
    try {
      const idea = ideas.find(i => i.Id === ideaId);
      if (!idea) return;

      const updatedIdea = {
        ...idea,
        votes: idea.hasVoted ? idea.votes - 1 : idea.votes + 1,
        hasVoted: !idea.hasVoted,
      };

      await ideaService.update(ideaId, updatedIdea);
      
      setIdeas(prev => prev.map(i => 
        i.Id === ideaId ? updatedIdea : i
      ));
      
      toast.success(idea.hasVoted ? 'Vote removed' : 'Vote added');
    } catch (err) {
      toast.error('Failed to update vote');
      console.error('Vote error:', err);
    }
  };

  const handleStatusChange = async (ideaId, newStatus) => {
    try {
      const idea = ideas.find(i => i.Id === ideaId);
      if (!idea) return;

      const updatedIdea = { ...idea, status: newStatus };
      await ideaService.update(ideaId, updatedIdea);
      
      setIdeas(prev => prev.map(i => 
        i.Id === ideaId ? updatedIdea : i
      ));
      
      toast.success(`Idea status updated to ${newStatus.replace('-', ' ')}`);
    } catch (err) {
      toast.error('Failed to update status');
      console.error('Status update error:', err);
    }
  };

  const handleComment = (ideaId) => {
    // Placeholder for comment functionality
    console.log('Comment on idea:', ideaId);
    toast.info('Comment functionality coming soon!');
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <Header title="Ideas" subtitle="Manage customer feedback and suggestions" />
        <div className="flex-1 p-6">
          <Loading type="cards" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <Header title="Ideas" subtitle="Manage customer feedback and suggestions" />
        <div className="flex-1 p-6">
          <Error 
            title="Failed to load ideas"
            message={error}
            onRetry={loadIdeas}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Header 
        title="Ideas" 
        subtitle="Manage customer feedback and suggestions"
        action={
          <Button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center space-x-2"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            <span>New Idea</span>
          </Button>
        }
      />
      
      <div className="flex-1 p-6 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <SearchBar
              placeholder="Search ideas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-96"
            />
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>

          {/* Ideas List */}
          {filteredIdeas.length === 0 ? (
            <Empty
              title="No ideas found"
              message={searchTerm || filters.status !== 'all' || filters.category !== 'all' 
                ? "Try adjusting your search or filter settings." 
                : "Get started by creating your first idea."
              }
              actionLabel="Create Idea"
              onAction={() => setShowCreateModal(true)}
              icon="Lightbulb"
            />
          ) : (
            <div className="space-y-4">
              {filteredIdeas.map((idea, index) => (
                <motion.div
                  key={idea.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <IdeaCard
                    idea={idea}
                    onVote={handleVote}
                    onStatusChange={handleStatusChange}
                    onComment={handleComment}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <CreateIdeaModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateIdea}
      />
    </div>
  );
};

export default Ideas;