import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import Header from '@/components/organisms/Header';
import MetricCard from '@/components/organisms/MetricCard';
import ActivityFeed from '@/components/organisms/ActivityFeed';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { ideaService } from '@/services/api/ideaService';
import { activityService } from '@/services/api/activityService';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalIdeas: 0,
    newIdeas: 0,
    totalVotes: 0,
    completedIdeas: 0,
  });
  const [activities, setActivities] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [ideasData, activitiesData] = await Promise.all([
        ideaService.getAll(),
        activityService.getAll(),
      ]);

      // Calculate metrics
      const totalIdeas = ideasData.length;
      const newIdeas = ideasData.filter(idea => {
        const createdAt = new Date(idea.createdAt);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return createdAt >= sevenDaysAgo;
      }).length;
      const totalVotes = ideasData.reduce((sum, idea) => sum + idea.votes, 0);
      const completedIdeas = ideasData.filter(idea => idea.status === 'completed').length;

      setMetrics({
        totalIdeas,
        newIdeas,
        totalVotes,
        completedIdeas,
      });

      setActivities(activitiesData.slice(0, 10));

      // Prepare chart data
      const statusCounts = {
        'not-planned': ideasData.filter(idea => idea.status === 'not-planned').length,
        'planned': ideasData.filter(idea => idea.status === 'planned').length,
        'in-progress': ideasData.filter(idea => idea.status === 'in-progress').length,
        'completed': ideasData.filter(idea => idea.status === 'completed').length,
      };

      setChartData({
        labels: ['Not Planned', 'Planned', 'In Progress', 'Completed'],
        datasets: [
          {
            label: 'Ideas by Status',
            data: [statusCounts['not-planned'], statusCounts['planned'], statusCounts['in-progress'], statusCounts['completed']],
            backgroundColor: [
              'rgba(156, 163, 175, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(16, 185, 129, 0.8)',
            ],
            borderColor: [
              'rgba(156, 163, 175, 1)',
              'rgba(59, 130, 246, 1)',
              'rgba(245, 158, 11, 1)',
              'rgba(16, 185, 129, 1)',
            ],
            borderWidth: 2,
            borderRadius: 8,
          },
        ],
      });
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <Header title="Dashboard" subtitle="Overview of your feedback management" />
        <div className="flex-1 p-6">
          <Loading type="dashboard" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <Header title="Dashboard" subtitle="Overview of your feedback management" />
        <div className="flex-1 p-6">
          <Error 
            title="Failed to load dashboard"
            message={error}
            onRetry={loadDashboardData}
          />
        </div>
      </div>
    );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Header title="Dashboard" subtitle="Overview of your feedback management" />
      
      <div className="flex-1 p-6 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Ideas"
              value={metrics.totalIdeas}
              icon="Lightbulb"
              color="primary"
            />
            <MetricCard
              title="New This Week"
              value={metrics.newIdeas}
              icon="TrendingUp"
              color="accent"
            />
            <MetricCard
              title="Total Votes"
              value={metrics.totalVotes}
              icon="ChevronUp"
              color="blue"
            />
            <MetricCard
              title="Completed"
              value={metrics.completedIdeas}
              icon="CheckCircle"
              color="purple"
            />
          </div>

          {/* Chart Section */}
          {chartData && (
            <motion.div
              className="card-elevated p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Ideas by Status
              </h3>
              <div className="h-80">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </motion.div>
          )}

          {/* Recent Activity */}
          <motion.div
            className="card-elevated p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Activity
            </h3>
            <ActivityFeed activities={activities} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;