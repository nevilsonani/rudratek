import { useState } from 'react';
import { Calendar, User, Clock, ChevronRight, MoreVertical, Trash2 } from 'lucide-react';

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
  active: '🟢',
  on_hold: '🟡',
  completed: '🔵',
};

const ProjectCard = ({ project, onClick, onUpdateStatus, onDelete }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleStatusChange = async (e) => {
    e.stopPropagation();
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

  const handleDelete = async (e) => {
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await onDelete(project.id);
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
    setShowActions(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getProgressColor = () => {
    if (project.status === 'completed') return 'from-blue-500 to-indigo-500';
    if (project.status === 'active') return 'from-green-500 to-emerald-500';
    return 'from-amber-500 to-orange-500';
  };

  return (
    <div 
      className="card hover-lift group cursor-pointer relative overflow-hidden animate-fadeInUp"
      onClick={() => onClick(project)}
      style={{ animationDelay: `${project.id * 50}ms` }}
    >
      {/* Gradient Border */}
      <div className={`absolute inset-0 bg-gradient-to-r ${getProgressColor()} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
            {project.name}
          </h3>
          <div className="flex items-center text-gray-600">
            <User className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm font-medium truncate">{project.clientName}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
          
          {/* Actions Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowActions(!showActions);
              }}
              className="p-1 rounded-lg hover:bg-gray-100/80 transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
            
            {showActions && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-10 animate-fadeInUp">
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Project
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className={`status-badge ${statusColors[project.status]} flex items-center gap-2`}>
          <span className="text-xs">{statusIcons[project.status]}</span>
          {statusLabels[project.status]}
        </span>
        
        <select
          value={project.status}
          onChange={handleStatusChange}
          onClick={(e) => e.stopPropagation()}
          disabled={isUpdating || project.status === 'completed'}
          className="text-xs border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 bg-white/80 backdrop-blur-sm"
        >
          <option value="active">🟢 Active</option>
          <option value="on_hold">🟡 On Hold</option>
          <option value="completed">🔵 Completed</option>
        </select>
      </div>

      {/* Dates */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
            <span>Start</span>
          </div>
          <span className="font-medium text-gray-900">{formatDate(project.startDate)}</span>
        </div>
        
        {project.endDate && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-green-500" />
              <span>End</span>
            </div>
            <span className="font-medium text-gray-900">{formatDate(project.endDate)}</span>
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{project.status === 'completed' ? '100%' : project.status === 'active' ? 'In Progress' : 'Paused'}</span>
        </div>
        <div className="w-full bg-gray-200/50 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getProgressColor()} transition-all duration-500 rounded-full`}
            style={{ width: project.status === 'completed' ? '100%' : project.status === 'active' ? '60%' : '30%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
