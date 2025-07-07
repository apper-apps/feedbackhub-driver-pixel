import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Header from '@/components/organisms/Header';
import KanbanBoard from '@/components/organisms/KanbanBoard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { ideaService } from '@/services/api/ideaService';

const Roadmap = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadIdeas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ideaService.getAll();
      setIdeas(data);
    } catch (err) {
      setError('Failed to load roadmap data');
      console.error('Roadmap error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIdeas();
  }, []);

  const handleStatusChange = async (ideaId, newStatus) => {
    try {
      const idea = ideas.find(i => i.Id === ideaId);
      if (!idea) return;

      const updatedIdea = { ...idea, status: newStatus };
      await ideaService.update(ideaId, updatedIdea);
      
      setIdeas(prev => prev.map(i => 
        i.Id === ideaId ? updatedIdea : i
      ));
      
      toast.success(`Idea moved to ${newStatus.replace('-', ' ')}`);
    } catch (err) {
      toast.error('Failed to update status');
      console.error('Status update error:', err);
    }
  };

  const handleCardClick = (ideaId) => {
    // Placeholder for opening idea details
    console.log('Open idea details:', ideaId);
    toast.info('Idea details coming soon!');
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <Header title="Roadmap" subtitle="Visualize and organize your product roadmap" />
        <div className="flex-1 p-6">
          <Loading type="kanban" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <Header title="Roadmap" subtitle="Visualize and organize your product roadmap" />
        <div className="flex-1 p-6">
          <Error 
            title="Failed to load roadmap"
            message={error}
            onRetry={loadIdeas}
          />
        </div>
      </div>
    );
  }

  if (ideas.length === 0) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <Header title="Roadmap" subtitle="Visualize and organize your product roadmap" />
        <div className="flex-1 p-6">
          <Empty
            title="No ideas in roadmap"
            message="Ideas will appear here once they are submitted and organized."
            actionLabel="View Ideas"
            onAction={() => window.location.href = '/ideas'}
            icon="Calendar"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Header title="Roadmap" subtitle="Visualize and organize your product roadmap" />
      
      <div className="flex-1 p-6 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-full"
        >
          <KanbanBoard
            ideas={ideas}
            onStatusChange={handleStatusChange}
            onCardClick={handleCardClick}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Roadmap;