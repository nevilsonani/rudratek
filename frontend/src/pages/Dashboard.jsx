import { useState } from 'react';
import { Plus, Sparkles, BarChart3 } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import ProjectFilters from '../components/ProjectFilters';
import ProjectCard from '../components/ProjectCard';
import ProjectDetail from '../components/ProjectDetail';
import CreateProjectForm from '../components/CreateProjectForm';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const {
    projects,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    createProject,
    updateProjectStatus,
    deleteProject,
    clearError,
    refetch,
  } = useProjects();

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleBackToList = () => {
    setSelectedProject(null);
  };

  const handleCreateProject = async (projectData) => {
    try {
      await createProject(projectData);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateProjectStatus(id, status);
      if (selectedProject && selectedProject.id === id) {
        refetch();
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      if (selectedProject && selectedProject.id === id) {
        setSelectedProject(null);
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  if (selectedProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
        <div className="container mx-auto px-4">
          <ProjectDetail
            project={selectedProject}
            onBack={handleBackToList}
            onUpdateStatus={handleUpdateStatus}
            loading={loading}
          />
        </div>
      </div>
    );
  }

  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const onHoldProjects = projects.filter(p => p.status === 'on_hold').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">Project Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage and track your projects efficiently</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn btn-primary flex items-center gap-2 shadow-xl"
            >
              <Plus className="w-5 h-5" />
              New Project
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-600 text-sm font-medium">Active Projects</p>
                  <p className="text-2xl font-bold text-emerald-900">{activeProjects}</p>
                </div>
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">🚀</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Completed</p>
                  <p className="text-2xl font-bold text-blue-900">{completedProjects}</p>
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">✅</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-600 text-sm font-medium">On Hold</p>
                  <p className="text-2xl font-bold text-amber-900">{onHoldProjects}</p>
                </div>
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">⏸️</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Error Message */}
        <ErrorMessage message={error} onDismiss={clearError} />

        {/* Filters */}
        <ProjectFilters
          filters={filters}
          onFiltersChange={updateFilters}
          onClearFilters={clearFilters}
        />

        {/* Content */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="large" text="Loading projects..." />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {filters.status || filters.search ? 'No projects found' : 'No projects yet'}
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  {filters.status || filters.search 
                    ? 'Try adjusting your filters or search terms to find what you\'re looking for.'
                    : 'Create your first project to get started on your journey.'
                  }
                </p>
                {!filters.status && !filters.search && (
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="btn btn-primary inline-flex items-center gap-2 shadow-xl"
                  >
                    <Plus className="w-5 h-5" />
                    Create Your First Project
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Results Summary */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Projects ({projects.length})
                  </h2>
                  {(filters.status || filters.search) && (
                    <span className="text-sm text-gray-500 bg-gray-100/80 px-3 py-1 rounded-full">
                      {filters.status && `Status: ${filters.status}`}
                      {filters.status && filters.search && ' • '}
                      {filters.search && `Search: "${filters.search}"`}
                    </span>
                  )}
                </div>
              </div>

              {/* Project Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={handleProjectClick}
                    onUpdateStatus={handleUpdateStatus}
                    onDelete={handleDeleteProject}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Create Project Modal */}
        {showCreateForm && (
          <CreateProjectForm
            onClose={() => setShowCreateForm(false)}
            onSubmit={handleCreateProject}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
