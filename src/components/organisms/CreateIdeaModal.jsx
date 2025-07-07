import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Textarea from '@/components/atoms/Textarea';
import FormField from '@/components/molecules/FormField';
import { cn } from '@/utils/cn';

const CreateIdeaModal = ({ isOpen, onClose, onSubmit, className = '' }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'feature',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'feature', label: 'Feature Request' },
    { value: 'improvement', label: 'Improvement' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'integration', label: 'Integration' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      setFormData({ title: '', description: '', category: 'feature' });
      onClose();
      toast.success('Idea submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit idea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              'bg-white rounded-lg shadow-strong border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto',
              className
            )}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Submit New Idea</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <ApperIcon name="X" className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField label="Title" required>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter your idea title..."
                    disabled={isSubmitting}
                  />
                </FormField>
                
                <FormField label="Description" required>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your idea in detail..."
                    rows={6}
                    disabled={isSubmitting}
                  />
                </FormField>
                
                <FormField label="Category">
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </FormField>
                
                <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Send" className="w-4 h-4" />
                        <span>Submit Idea</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateIdeaModal;