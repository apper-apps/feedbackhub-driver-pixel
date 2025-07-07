import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import { cn } from '@/utils/cn';

const KanbanBoard = ({ 
  ideas = [], 
  onStatusChange, 
  onCardClick, 
  className = '' 
}) => {
  const [draggedCard, setDraggedCard] = useState(null);

  const columns = [
    {
      id: 'not-planned',
      title: 'Not Planned',
      color: 'bg-gray-50',
      count: ideas.filter(idea => idea.status === 'not-planned').length,
    },
    {
      id: 'planned',
      title: 'Planned',
      color: 'bg-blue-50',
      count: ideas.filter(idea => idea.status === 'planned').length,
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-yellow-50',
      count: ideas.filter(idea => idea.status === 'in-progress').length,
    },
    {
      id: 'completed',
      title: 'Completed',
      color: 'bg-green-50',
      count: ideas.filter(idea => idea.status === 'completed').length,
    },
  ];

  const handleDragEnd = (result) => {
    setDraggedCard(null);
    
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) return;

    const ideaId = parseInt(draggableId);
    const newStatus = destination.droppableId;

    if (onStatusChange) {
      onStatusChange(ideaId, newStatus);
    }
  };

  const handleDragStart = (result) => {
    setDraggedCard(result.draggableId);
  };

  const IdeaCard = ({ idea, index }) => (
    <Draggable draggableId={idea.Id.toString()} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            'bg-white rounded-lg shadow-soft border border-gray-200 p-4 mb-3 cursor-pointer',
            'hover:shadow-medium transition-all duration-200',
            snapshot.isDragging && 'rotate-3 shadow-strong'
          )}
          onClick={() => onCardClick && onCardClick(idea.Id)}
          whileHover={{ scale: 1.02 }}
          layout
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-gray-900 line-clamp-2 text-sm">
              {idea.title}
            </h4>
            <div className="flex items-center space-x-1 text-xs text-gray-500 ml-2">
              <ApperIcon name="MessageCircle" className="w-3 h-3" />
              <span>{idea.commentCount || 0}</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-600 line-clamp-2 mb-3">
            {idea.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <ApperIcon name="ChevronUp" className="w-3 h-3" />
                <span>{idea.votes}</span>
              </div>
            </div>
            
            <div className="w-2 h-2 bg-gray-300 rounded-full opacity-50"></div>
          </div>
        </motion.div>
      )}
    </Draggable>
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
        {columns.map((column) => (
          <motion.div
            key={column.id}
            className={cn('rounded-lg p-4', column.color)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: columns.indexOf(column) * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{column.title}</h3>
              <Badge variant="default" size="sm">
                {column.count}
              </Badge>
            </div>
            
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    'min-h-[400px] transition-all duration-200',
                    snapshot.isDraggingOver && 'bg-primary-50 rounded-lg'
                  )}
                >
                  <AnimatePresence>
                    {ideas
                      .filter(idea => idea.status === column.id)
                      .map((idea, index) => (
                        <IdeaCard key={idea.Id} idea={idea} index={index} />
                      ))}
                  </AnimatePresence>
                  {provided.placeholder}
                  
                  {ideas.filter(idea => idea.status === column.id).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <ApperIcon name="Package" className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">No ideas yet</p>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </motion.div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;