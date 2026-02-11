import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

export const useProjects = (initialFilters = {}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProjects(filters);
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const createProject = useCallback(async (projectData) => {
    try {
      const newProject = await apiService.createProject(projectData);
      setProjects(prev => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateProjectStatus = useCallback(async (id, status) => {
    try {
      const updatedProject = await apiService.updateProjectStatus(id, status);
      setProjects(prev => 
        prev.map(project => 
          project.id === id ? updatedProject : project
        )
      );
      return updatedProject;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteProject = useCallback(async (id) => {
    try {
      await apiService.deleteProject(id);
      setProjects(prev => prev.filter(project => project.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
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
    refetch: fetchProjects,
  };
};
