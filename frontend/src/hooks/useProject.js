import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

export const useProject = (id) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProject = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getProject(id);
      setProject(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const updateStatus = useCallback(async (status) => {
    if (!id) return;
    
    try {
      setError(null);
      const updatedProject = await apiService.updateProjectStatus(id, status);
      setProject(updatedProject);
      return updatedProject;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [id]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    project,
    loading,
    error,
    updateStatus,
    clearError,
    refetch: fetchProject,
  };
};
