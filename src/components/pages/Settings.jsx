import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Header from '@/components/organisms/Header';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import FormField from '@/components/molecules/FormField';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import ApperIcon from '@/components/ApperIcon';
import { projectService } from '@/services/api/projectService';

const Settings = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAll();
      setProjects(data);
    } catch (err) {
      toast.error('Failed to load projects');
      console.error('Settings error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleUpdateProject = async (projectId, updates) => {
    try {
      setSaving(true);
      await projectService.update(projectId, updates);
      setProjects(prev => prev.map(p => 
        p.Id === projectId ? { ...p, ...updates } : p
      ));
      toast.success('Project updated successfully');
    } catch (err) {
      toast.error('Failed to update project');
      console.error('Update error:', err);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'projects', label: 'Projects', icon: 'FolderOpen' },
    { id: 'team', label: 'Team', icon: 'Users' },
    { id: 'integrations', label: 'Integrations', icon: 'Plug' },
    { id: 'billing', label: 'Billing', icon: 'CreditCard' },
  ];

  const ProjectCard = ({ project }) => {
    const [name, setName] = useState(project.name);
    const [primaryColor, setPrimaryColor] = useState(project.primaryColor);

    const handleSave = () => {
      handleUpdateProject(project.Id, { name, primaryColor });
    };

    return (
      <motion.div
        className="card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: primaryColor }}
            >
              <ApperIcon name="MessageSquare" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{project.name}</h3>
              <Badge variant="accent" size="sm">Active</Badge>
            </div>
          </div>
          
          <Button
            onClick={handleSave}
            disabled={saving}
            size="sm"
            className="inline-flex items-center space-x-2"
          >
            <ApperIcon name="Save" className="w-4 h-4" />
            <span>Save</span>
          </Button>
        </div>
        
        <div className="space-y-4">
          <FormField label="Project Name">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
            />
          </FormField>
          
          <FormField label="Primary Color">
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <Input
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </FormField>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <Header title="Settings" subtitle="Configure your FeedbackHub workspace" />
        <div className="flex-1 p-6">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Header title="Settings" subtitle="Configure your FeedbackHub workspace" />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 text-left ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <ApperIcon name={tab.icon} className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
                  <Button
                    onClick={() => toast.info('Create project coming soon!')}
                    className="inline-flex items-center space-x-2"
                  >
                    <ApperIcon name="Plus" className="w-4 h-4" />
                    <span>New Project</span>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {projects.map(project => (
                    <ProjectCard key={project.Id} project={project} />
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'team' && (
              <div className="text-center py-12">
                <ApperIcon name="Users" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Management</h3>
                <p className="text-gray-600">Team collaboration features coming soon!</p>
              </div>
            )}
            
            {activeTab === 'integrations' && (
              <div className="text-center py-12">
                <ApperIcon name="Plug" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Integrations</h3>
                <p className="text-gray-600">Connect with your favorite tools and services.</p>
              </div>
            )}
            
            {activeTab === 'billing' && (
              <div className="text-center py-12">
                <ApperIcon name="CreditCard" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Billing & Plans</h3>
                <p className="text-gray-600">Manage your subscription and billing information.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;