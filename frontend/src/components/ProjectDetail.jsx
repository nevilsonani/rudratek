import { useState } from 'react';
import { Calendar, User, Clock, ArrowLeft, CheckCircle, PauseCircle, PlayCircle, Trophy } from 'lucide-react';

const statusColors = {
  active: 'status-active',
  on_hold: 'status-on_hold',
  completed: 'status-completed',
};

const statusLabels = {
  active: 'Active',
  on_hold: 'On Hold',
  completed: 'Completed',
};

const statusIcons = {
  active: <PlayCircle className="w-5 h-5" />,
  on_hold: <PauseCircle className="w-5 h-5" />,
  completed: <Trophy className="w-5 h-5" />,
};

const ProjectDetail = ({ project, onBack, onUpdateStatus, loading }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    
    if (newStatus === project.status) return;
    
    try {
      setIsUpdating(true);
      await onUpdateStatus(project.id, newStatus);
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProgressPercentage = () => {
    if (project.status === 'completed') return 100;
    if (project.status === 'active') return 60;
    return 30;
  };

  const getProgressColor = () => {
    if (project.status === 'completed') return 'from-blue-500 to-indigo-500';
    if (project.status === 'active') return 'from-green-500 to-emerald-500';
    return 'from-amber-500 to-orange-500';
  };

  if (!project) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Project not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-fadeInUp">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>
        
        <div className="glass-card">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${getProgressColor()} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  {statusIcons[project.status]}
                </div>
                <div>
                  <h1 className="text-4xl font-bold gradient-text mb-2">{project.name}</h1>
                  <div className="flex items-center text-gray-600">
                    <User className="w-5 h-5 mr-2" />
                    <span className="text-lg">{project.clientName}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-4">
              <span className={`status-badge ${statusColors[project.status]} text-base px-4 py-2`}>
                {statusLabels[project.status]}
              </span>
              
              <select
                value={project.status}
                onChange={handleStatusChange}
                disabled={isUpdating || project.status === 'completed' || loading}
                className="border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 bg-white/80 backdrop-blur-sm shadow-sm"
              >
                <option value="active">🟢 Active</option>
                <option value="on_hold">🟡 On Hold</option>
                <option value="completed">🔵 Completed</option>
              </select>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">Project Progress</span>
              <span className="text-sm font-bold text-gray-900">{getProgressPercentage()}%</span>
            </div>
            <div className="w-full bg-gray-200/50 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${getProgressColor()} transition-all duration-700 rounded-full shadow-sm`}
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline Card */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-500" />
            Project Timeline
          </h2>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">Start Date</p>
                  <p className="text-lg font-bold text-blue-700">{formatDate(project.startDate)}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            {project.endDate && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-green-900 mb-1">End Date</p>
                    <p className="text-lg font-bold text-green-700">{formatDate(project.endDate)}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* System Information Card */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-purple-500" />
            System Information
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-50/80 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">Created At</p>
              <p className="text-gray-900">{formatDateTime(project.createdAt)}</p>
            </div>
            
            <div className="bg-gray-50/80 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">Last Updated</p>
              <p className="text-gray-900">{formatDateTime(project.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Information */}
      <div className="card mt-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-500" />
          Status Information
        </h2>
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200/50">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${getProgressColor()} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
              {statusIcons[project.status]}
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Current Status: {statusLabels[project.status]}
              </p>
              
              {project.status === 'completed' && (
                <div className="bg-blue-100/80 rounded-lg p-4 border border-blue-200/50">
                  <p className="text-blue-800 font-medium">
                    🎉 This project has been completed successfully! No further modifications are allowed.
                  </p>
                </div>
              )}
              
              {project.status === 'active' && (
                <div className="bg-green-100/80 rounded-lg p-4 border border-green-200/50">
                  <p className="text-green-800 font-medium">
                    🚀 This project is currently active and in progress. You can put it on hold or mark it as completed.
                  </p>
                </div>
              )}
              
              {project.status === 'on_hold' && (
                <div className="bg-amber-100/80 rounded-lg p-4 border border-amber-200/50">
                  <p className="text-amber-800 font-medium">
                    ⏸️ This project is currently on hold. You can reactivate it or mark it as completed.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
