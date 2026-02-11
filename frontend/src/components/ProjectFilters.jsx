import { useState } from 'react';
import { Search, Filter, X, Sparkles } from 'lucide-react';

const ProjectFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState({
    status: filters.status || '',
    search: filters.search || '',
    sortBy: filters.sortBy || 'createdAt',
    sortOrder: filters.sortOrder || 'DESC',
  });

  const handleChange = (field, value) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClear = () => {
    const clearedFilters = {
      status: '',
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'DESC',
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = localFilters.status || localFilters.search;

  return (
    <div className="glass-card animate-fadeInUp mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
          <Filter className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Filters & Search</h3>
        {hasActiveFilters && (
          <button
            onClick={handleClear}
            className="ml-auto text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100/80 transition-all duration-200"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects by name or client..."
            value={localFilters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            className="input pl-12 pr-4 py-3"
          />
          {localFilters.search && (
            <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" />
          )}
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={localFilters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="input appearance-none pr-10 py-3"
          >
            <option value="">All Statuses</option>
            <option value="active">🟢 Active</option>
            <option value="on_hold">🟡 On Hold</option>
            <option value="completed">🔵 Completed</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Sort By */}
        <div className="relative">
          <select
            value={localFilters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="input appearance-none pr-10 py-3"
          >
            <option value="createdAt">📅 Created Date</option>
            <option value="startDate">🚀 Start Date</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Sort Order Toggle */}
      <div className="mt-4 flex items-center gap-4">
        <span className="text-sm text-gray-600">Sort order:</span>
        <div className="flex bg-gray-100/80 rounded-lg p-1">
          <button
            onClick={() => handleChange('sortOrder', 'DESC')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              localFilters.sortOrder === 'DESC'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Newest First
          </button>
          <button
            onClick={() => handleChange('sortOrder', 'ASC')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              localFilters.sortOrder === 'ASC'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Oldest First
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;
