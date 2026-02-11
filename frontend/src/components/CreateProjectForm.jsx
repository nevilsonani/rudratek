import { useState } from 'react';
import { X, Plus, Sparkles, User, Calendar, Clock } from 'lucide-react';

const CreateProjectForm = ({ onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    clientName: '',
    status: 'active',
    startDate: '',
    endDate: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    }

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (formData.endDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeInUp">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold gradient-text">Create New Project</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Project Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              Project Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input ${errors.name ? 'border-red-500 bg-red-50/50' : ''}`}
              placeholder="Enter project name"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.name}
              </p>
            )}
          </div>

          {/* Client Name */}
          <div>
            <label htmlFor="clientName" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-500" />
              Client Name *
            </label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className={`input ${errors.clientName ? 'border-red-500 bg-red-50/50' : ''}`}
              placeholder="Enter client name"
            />
            {errors.clientName && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.clientName}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <span className="w-4 h-4 text-blue-500">🎯</span>
              Initial Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input"
            >
              <option value="active">🟢 Active</option>
              <option value="on_hold">🟡 On Hold</option>
              <option value="completed">🔵 Completed</option>
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                Start Date *
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`input ${errors.startDate ? 'border-red-500 bg-red-50/50' : ''}`}
              />
              {errors.startDate && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.startDate}
                </p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label htmlFor="endDate" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate}
                className={`input ${errors.endDate ? 'border-red-500 bg-red-50/50' : ''}`}
              />
              {errors.endDate && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.endDate}
                </p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary flex-1"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1 flex items-center justify-center shadow-xl"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Create Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
